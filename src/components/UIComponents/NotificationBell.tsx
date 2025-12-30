import React, { useCallback, memo } from "react";
import { useNotifications } from "../../context/NotificationContext";
import {
  BellIcon,
  BellSlashIcon,
  SignalIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

const NotificationItem = memo(
  ({
    message,
    createdAt,
  }: {
    message: string;
    createdAt: string | number | Date;
  }) => (
    <div className="alert py-3 px-4 bg-base-200 border-l-4 border-primary rounded-xl text-left shadow-sm">
      <div className="flex flex-col gap-1">
        <span className="text-[9px] font-black font-mono opacity-40">
          [{new Date(createdAt).toLocaleTimeString()}]
        </span>
        <span className="text-xs font-bold leading-tight">{message}</span>
      </div>
    </div>
  )
);

NotificationItem.displayName = "NotificationItem";

const NotificationBell: React.FC = () => {
  const {
    isMuted,
    toggleMute,
    notifications,
    clearNotifications,
    isListening,
  } = useNotifications();

  const handleToggleMute = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleMute();
    },
    [toggleMute]
  );

  const hasNotifications = notifications.length > 0;

  return (
    <div className="flex items-center gap-4 text-base-content">
      {isListening && (
        <div
          className={`hidden md:flex items-center gap-3 px-5 py-2 rounded-xl border-2 font-black font-mono tracking-widest transition-all duration-300 ${
            isMuted
              ? "bg-error text-error-content border-error shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              : "bg-success text-success-content border-success animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.4)]"
          }`}
        >
          {isMuted ? (
            <NoSymbolIcon className="w-4 h-4" />
          ) : (
            <SignalIcon className="w-4 h-4 animate-ping" />
          )}
          <span className="text-[12px]">
            {isMuted ? "SERVER_OFFLINE" : "SERVER_ONLINE"}
          </span>
        </div>
      )}

      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className={`btn btn-ghost btn-circle h-14 w-14 ${
            isMuted ? "text-error" : "text-primary"
          }`}
        >
          <div className="indicator">
            {isMuted ? (
              <BellSlashIcon className="w-8 h-8" />
            ) : (
              <BellIcon
                className={`w-8 h-8 ${
                  hasNotifications ? "animate-bounce" : ""
                }`}
              />
            )}
            {hasNotifications && !isMuted && (
              <span className="badge badge-md badge-primary indicator-item font-black border-2 border-base-100">
                {notifications.length}
              </span>
            )}
          </div>
        </div>

        <div
          tabIndex={0}
          className="dropdown-content z-50 card card-compact w-80 p-3 shadow-2xl bg-base-100 border-2 border-base-300 mt-4 rounded-2xl"
        >
          <div className="card-body">
            <div className="flex justify-between items-center border-b-2 border-base-300 pb-3">
              <span className="font-black text-[10px] uppercase tracking-tighter opacity-60">
                Data_Stream: {isMuted ? "Suspended" : "Active"}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleToggleMute}
                  className={`btn btn-xs font-bold ${
                    isMuted ? "btn-success" : "btn-error"
                  }`}
                >
                  {isMuted ? "START" : "STOP"}
                </button>
                <button
                  onClick={clearNotifications}
                  className="btn btn-xs btn-outline btn-error font-bold"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto mt-3 custom-scrollbar">
              {!hasNotifications ? (
                <div className="text-center py-10 opacity-20">
                  <BellIcon className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-xs font-black font-mono tracking-widest uppercase">
                    No_Incoming_Packets
                  </p>
                </div>
              ) : (
                notifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    message={n.message}
                    createdAt={n.createdAt}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NotificationBell);
