import { Character } from "../types/Character"

export async function makeDecisionRequest(
    character: Character,
    option1: string,
    option2: string 
) {
    const res = await fetch('/api/decisions', {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            character,
            option1,
            option2
        })
    })

    return res.json()
}
