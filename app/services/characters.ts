export const fetchCharacters = async () => {
    const res = await fetch("/api/wizards")
    const data = await res.json()

    return data.characters
}