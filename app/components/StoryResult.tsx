type Props = {
    story: string 
}

export default function StoryResult({
    story 
}: Props) {
    return (
        <div>
            <h2>Character Decision</h2>
            <p>{story}</p>
        </div>
    )
}