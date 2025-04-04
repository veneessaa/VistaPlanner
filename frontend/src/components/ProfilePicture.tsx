interface Props {
  name: string | undefined;
  fontSize: string;
}

export const ProfilePicture = ({ name, fontSize }: Props) => {
  if (!name) return null;

  return (
    <div className="w-full h-full border-1 border-primary rounded-full relative bg-primary">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
        style={{ fontSize: `${fontSize}px` }}
      >
        {name[0]}
      </div>
    </div>
  );
};
