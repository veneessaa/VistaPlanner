interface Props {
    text: string;
  }
  
  export const HomeStatusTag = ({ text }: Props) => {
    const colorMap: Record<string, string> = {
      "Not Started": "text-gray-400",
      "In Progress": "text-blue-500",
      "Done": "text-green-400",
      "Late" : "text-red-600"
    };
  
    return (
      <div className={`${colorMap[text]} bg-light border-2 px-1.5 rounded-lg text-[13px] h-fit`}>
        {text}
      </div>
    );
  };
  