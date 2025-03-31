interface Props {
    image: string
    title: string
    description: string
}

export const WhiteCard = ({ image, title, description }: Props) => {
    return (
        <div className="bg-section flex flex-col border-2 border-sec rounded-full p-10 shadow-lg">
            <div className="flex justify-center items-center">
                <img className="h-[100px] w-auto" src={image} alt="" />
            </div>
            <div className="content flex flex-col justify-center items-center">
                <h1 className="text-center text-xl text-mid mb-2 mt-3">{title}</h1>
                <p className="text-center">{description}</p>
            </div>
        </div>
    )
}