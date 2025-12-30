import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { ApiRequest, INotification } from "../api/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

interface NotificationContextType {
  isMuted: boolean;
  notifications: INotification[];
  toggleMute: () => void;
  clearNotifications: () => void;
  isListening: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isListening, setIsListening] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const lastIdRef = useRef<string | null>(null);

  const getCleanToken = useCallback((): string => {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("persist:")) {
          const data = localStorage.getItem(key);
          if (data) {
            const parsed = JSON.parse(data);
            if (parsed.token) return JSON.parse(parsed.token);
          }
        }
      }
      return localStorage.getItem("token")?.replace(/"/g, "") || "";
    } catch {
      return "";
    }
  }, []);

  const fetchNotification = useCallback(async () => {
    const token = getCleanToken();

    if (isMuted || !isLoggedIn || !token) return;

    try {
      const data = await ApiRequest.getLatestNotification();
      if (data && data.id && data.id !== lastIdRef.current) {
        lastIdRef.current = data.id;
        setNotifications((prev) => [data, ...prev].slice(0, 10));

        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible
                  ? "animate-in fade-in zoom-in"
                  : "animate-out fade-out zoom-out"
              } max-w-md w-full bg-base-100 shadow-2xl rounded-xl border-2 border-primary flex p-4 pointer-events-auto`}
            >
              <div className="flex flex-col text-left flex-1">
                <span className="font-black text-[10px] uppercase text-primary tracking-widest">
                  Incoming_Packet
                </span>
                <span className="text-xs font-bold text-base-content leading-tight">
                  {data.message}
                </span>
              </div>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="btn btn-xs btn-circle btn-ghost text-base-content"
              >
                ✕
              </button>
            </div>
          ),
          { duration: 4000 }
        );
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, [isMuted, isLoggedIn, getCleanToken]);

  useEffect(() => {
    const token = getCleanToken();
    const canConnect = isLoggedIn && !!token;

    setIsListening(canConnect);

    if (canConnect) {
      fetchNotification();
      const interval = setInterval(fetchNotification, 15000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, fetchNotification, getCleanToken]);

  const value = useMemo(
    () => ({
      isMuted,
      notifications,
      toggleMute: () => setIsMuted((prev) => !prev),
      clearNotifications: () => {
        setNotifications([]);
        lastIdRef.current = null;
      },
      isListening,
    }),
    [isMuted, notifications, isListening]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications error");
  return context;
};
