interface Props {
    image: string
    title: string
    description: string
}

export const SocialMediaCard = ({ image, title, description }: Props) => {
    return (
        <div className="bg-sec rounded-[50px] flex flex-col items-center shadow-lg p-8 gap-2">
            <div className="flex items-center mb-1">
                <img className="object-cover h-[50px]" src={image} alt="" />
                <h1 className="font-bold text-white text-xl">{title}</h1>
            </div>
            <p className="text-center text-white">{description}</p>
        </div>
    )
}