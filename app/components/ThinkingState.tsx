type Props = {
    name?: string 
}

export default function ThinkingState({
    name 
}: Props) {
    return (
        <div>
            <h2>
                {name} is thinking...
            </h2>

            <p>
                Considering both options...
            </p>
        </div>
    )
}