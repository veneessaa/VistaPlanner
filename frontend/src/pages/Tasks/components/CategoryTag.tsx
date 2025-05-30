interface Props {
  text: string;
}

export const CategoryTag = ({ text }: Props) => {
  const colorMap: Record<string, string> = {
    Assignment: "bg-orange-500",
    Project: "bg-purple-500",
    Meeting: "bg-blue-400",
    "Exam/Quiz": "bg-red-500",
    Presentation: "bg-yellow-500",
    Others: "bg-gray-500",
  };

  return (
    <div
      className={`${
        colorMap[text] || "bg-gray-400"
      } px-4 py-1 rounded-lg text-white text-[15px]`}
    >
      {text}
    </div>
  );
};
