export type CardDetailsProps = {
    id: string,
}

export default function CardDetails({id}: CardDetailsProps){
    return(
        <div className="w-screen h-screen bg-color-mixed-100 ">
            {`${id}`}
        </div>
    )
}