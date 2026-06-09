type Props = {
    name?: string 
}

export default function ThinkingState({
    name 
}: Props) {
    return (
        <div>
            <h2 className="animate-pulse">
                {name} is thinking...
            </h2>

            <p className="animate-pulse">
                Considering both options...
            </p>
        </div>
    )
}