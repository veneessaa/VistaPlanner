interface Props {
    text: string;
  }
  
  export const HomePriorityTag = ({ text }: Props) => {
    const colorMap: Record<string, string> = {
      "High": "text-red-500",
      "Medium": "text-yellow-500",
      "Low": "text-green-500",
    };
  
    return (
      <div className={`${colorMap[text]} bg-light border-2 px-3 rounded-lg text-[12px] mr-3 h-fit`}>
        {text}
      </div>
    );
  };
  