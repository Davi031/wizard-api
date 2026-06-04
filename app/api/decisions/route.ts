import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const { character, option1, option2 } = await request.json()

    const prompt = `Você é um personagem ${character.name} 
    usando como base a descrição da PERSONALIDADE do personagem: 
    ${character.desc}. 
    Escolha entre duas opções e crie uma pequena de um fábula parágrafo envolvendo 
    a escolha do usuário. As opções são: 
    
    1) ${option1}
    2) ${option2}

    Baseie sua decisão na personalidade do personagem.
    No inicío escreva: Escolha... Depois descreva o motivo da escolha e conte a história. 
    Seja criativo e mantenha a resposta curta, com no máximo 150 palavras.
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