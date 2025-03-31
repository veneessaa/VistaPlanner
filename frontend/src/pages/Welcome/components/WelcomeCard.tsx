interface Props {
    image: string
    title: string
    description: string
}

export const WelcomeCard = ({ image, title, description }: Props) => {
    return (
        <div className="bg-white rounded-xl flex flex-col items-center shadow-lg">
            <div className="image-container relative bg-sec w-full py-5 rounded-tr-xl rounded-tl-xl flex justify-center items-center">
                <img className="object-cover h-[150px]" src={image} alt="" />
            </div>
            <div className="p-8 flex flex-col items-center gap-2">
                <h1 className="font-bold text-mid text-xl">{title}</h1>
                <p className="text-center">{description}</p>
            </div>
        </div>
    )
}