import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        const res = await fetch("https://www.dnd5eapi.co/api/2014/classes")
        const data = await res.json()

        const characters = await Promise.all(
            data.results.map(async (char: any) => {
                const classRes = await fetch(
                    `https://www.dnd5eapi.co${char.url}`
                )
                const classData = await classRes.json()

                const subclassUrl = classData.subclasses[0].url

                const subclassRes = await fetch(
                    `https://www.dnd5eapi.co${subclassUrl}`
                )
                const subclassData = await subclassRes.json()

                return {
                    name: char.name,
                    description: subclassData.desc?.[0] || "No description"
                }
            })
        )
        return NextResponse.json({ characters })
    } catch (error) {
        return NextResponse.json({
            error: "Failed to fetch characters"
        })
    }
}