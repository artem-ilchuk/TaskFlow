type TaskAreaProps = {
  title: string;
  color: readonly [string, string];
  children: React.ReactNode;
};

export function TaskArea({ title, color, children }: TaskAreaProps) {
  return (
    <div
      className="
      relative
      w-[320px]
      rounded-[28px]
      bg-[#151820]
      px-6
      pt-20
      pb-6
      shadow-[0_30px_80px_rgba(0,0,0,0.6)]
    "
    >
      <div
        className="
          absolute
          -top-6
          left-1/2
          -translate-x-1/2
          w-52
          h-12
          rounded-full
          blur-[0.2px]
          shadow-[0_10px_30px_rgba(0,0,0,0.6)]
        "
        style={{
          background: `linear-gradient(to bottom, ${color[0]}, ${color[1]})`,
        }}
      />

      <div
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-52 h-12 rounded-full blur-2xl opacity-50"
        style={{
          background: color[0],
        }}
      />

      <h2 className="text-center text-lg font-semibold tracking-wide text-white mb-6">
        {title}
      </h2>

      <div className="space-y-4 min-h-[120px]">{children}</div>
    </div>
  );
}
