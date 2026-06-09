import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const { character, option1, option2 } = await request.json()

    const prompt = `You are a ${character.name} character, 
    using the CHARACTER'S PERSONALITY description as a basis:
    
    ${character.desc}.
    
    Choose between two options and create a short fable paragraph involving
    the user's choice. The options are:
    
    1) ${option1}
    2) ${option2}
    
    At the beginning, write: The choice is... 
    Then describe the reason for the choice.
    
    Be creative and keep the response short, with a maximum of 150 words.
    `
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            })
        }
    )

    const data = await response.json()
    console.log(data)

    const story =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response"

    return NextResponse.json({ story })
} 