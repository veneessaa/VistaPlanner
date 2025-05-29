interface Props {
  text: string;
}

export const HomeCategoryTag = ({ text }: Props) => {
  const colorMap: Record<string, string> = {
    Assignment: "bg-orange-500",
    Project: "bg-purple-500",
    Meeting: "bg-blue-400",
    "Exam/Quiz": "bg-red-500",
    "Class Schedule": "bg-yellow-500",
    Others: "bg-gray-500",
  };

  return (
    <div
      className={`${
        colorMap[text] || "bg-gray-400"
      } px-2 py-0.5 rounded-lg text-white text-[13px]`}
    >
      {text}
    </div>
  );
};
