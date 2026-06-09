import { Character } from "../types/Character"

type Props = {
    character: Character 
    open: boolean 
    onToggle: () => void 
}

export default function CharacterDescription({
    character,
    open,
    onToggle
}: Props) {
    return (
        <div className="w-full max-w-lg mt-4">
            <button
            onClick={onToggle}
            className="w-full px-4 py-2 rounded w-full cursor-pointer"
            >
                {open 
                ? "Hide Description"
                : "Show Description"}
            </button>

            {open && (
                <div className="border p-4">
                    <p>{character.description}</p>
                </div>
            )}
        </div>
    )
}