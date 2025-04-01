import { Link } from "react-router-dom";

interface Props {
    image: string;
    title: string;
    description: string;
}

export const SocialMediaCard = ({ image, title, description }: Props) => {
    return (
        <div className="bg-sec rounded-[50px] flex flex-col items-center shadow-lg p-8 gap-5 h-full">
            <div className="flex-1 flex flex-col items-center gap-2">
                <div className="flex items-center mb-1 gap-3">
                    <img className="object-cover h-[50px]" src={image} alt="" />
                    <h1 className="font-bold text-white text-3xl">{title}</h1>
                </div>
                <p className="text-center text-white">{description}</p>
            </div>
            <p className="text-white">
                Click <Link to="/" className="underline">here</Link> to follow us!
            </p>
        </div>
    );
};
