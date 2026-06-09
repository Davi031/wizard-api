import { Character } from "../types/Character"

type Props = {
    characters: Character[]
    onSelect: (character: Character | null) => void
}

export default function CharacterSelector({
    characters,
    onSelect
}: Props) {
    return (
        <div className="flex flex-col items-center gap-4 mt-8">

            <h2 className="text-xl font-semibold">
                Choose a character and give two options
            </h2>

            <select
                className="
                    cursor-pointer
                    border
                    rounded
                    p-2
                    min-w-[200px]
                "
                onChange={(e) => {
                    const character =
                        characters.find(
                            c => c.index === e.target.value
                        ) || null

                    onSelect(character)
                }}
            >
                <option value="" className="text-black">
                    Select a character
                </option>

                {characters.map(character => (
                    <option
                        className="text-black"
                        key={character.index}
                        value={character.index}
                    >
                        {character.name}
                    </option>
                ))}
            </select>
        </div>
    )
}