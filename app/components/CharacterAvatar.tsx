import Image from "next/image"
import { Character } from "../types/Character"

type Props = {
    character: Character | null 
}

export default function CharacterAvatar({
    character 
}: Props) {
    return (
        <div className="h-32 w-32 relative border">
            {character && (
                <Image 
                    src={`/characters/${character.index}.png`}
                    alt={character.name}
                    fill 
                    className="object-contain"
                />
            )}
        </div>
    )
}