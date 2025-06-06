// components/icons/ApiStreakIcon.tsx
import { Flame } from "lucide-react";


const FlameStreakIcon = ({
  count = 0,
  active = true,
}: {
  count?: number;
  active?: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-1 px-3 py-0.5 rounded-full shadow-md transition-all duration-300
        ${active ? "bg-orange-600 text-white animate-pulse" : "bg-gray-300 text-gray-600"}`}
      title={`${count} day streak`}
    >
      <Flame className="w-4 h-4" />
      <span className="text-sm font-semibold translate-y-[1px]">{count}</span>
    </div>
  );
};

export default FlameStreakIcon;
