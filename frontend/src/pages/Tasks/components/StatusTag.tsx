interface Props {
    text: string;
  }
  
  export const StatusTag = ({ text }: Props) => {
    const colorMap: Record<string, string> = {
      "Not Started": "text-gray-400",
      "In Progress": "text-blue-500",
      "Done": "text-green-400",
    };
  
    return (
      <div className={`${colorMap[text]} bg-light border-2 px-4 py-1 rounded-lg text-[15px]`}>
        {text}
      </div>
    );
  };
  