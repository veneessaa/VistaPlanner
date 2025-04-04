interface Props {
    text: string;
  }
  
  export const PriorityTag = ({ text }: Props) => {
    const colorMap: Record<string, string> = {
      "High": "text-red-500",
      "Medium": "text-yellow-500",
      "Low": "text-green-500",
    };
  
    return (
      <div className={`${colorMap[text]} bg-light border-2 px-3 rounded-lg text-[14px] mr-3`}>
        {text}
      </div>
    );
  };
  