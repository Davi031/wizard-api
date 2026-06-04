"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  type Character = {
    index: string
    name: string
    description: string
  }

  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [option1, setOption1] = useState("")
  const [option2, setOption2] = useState("")
  const [story, setStory] = useState("")
  const [showDescription, setShowDescription] = useState(false)
  const [isThinking, setIsThinking] = useState(false)

  useEffect(() => {
    fetchCharacters()
  }, [])

  const fetchCharacters = async () => {
    const res = await fetch("/api/wizards")
    const data = await res.json()

    setCharacters(data.characters)
  }

  const makeDecision = async () => {
    if (!selectedCharacter) return

    setIsThinking(true)
    setStory("")

    try {
      const res = await fetch('/api/decisions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          character: selectedCharacter,
          option1,
          option2
        })
      })

      const data = await res.json()

      setStory(data.story)

    } finally {
      setIsThinking(false)
    }
  }

  return (
    <div className='p-8 items-center flex flex-col'>
      <h1 className="text-4xl font-bold">
        Make decisions using the personality of ours characters!
      </h1>

      <div className='flex flex-col items-center gap-4 mt-8'>

        <h2 className="text-xl font-semibold">
          Choose a character and give two options
        </h2>

        <div className="h-32 w-32 relative border">
          {selectedCharacter && (
            <Image
              src={`/characters/${selectedCharacter.index}.png`}
              alt={selectedCharacter.name}
              fill
              className="object-contain"
            />
          )}
        </div>

        <select
          className='cursor-pointer'
          onChange={(e) => {
            const character = characters.find(
              (c) => c.index === e.target.value
            )

            setSelectedCharacter(character ?? null)
            setShowDescription(false)
          }}
        >
          <option value="" className='text-black'>Select a character</option>

          {characters.map((char) => (
            <option key={char.index}
              value={char.index}
              className='text-black'
            >
              {char.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCharacter && (
        <div className='w-full max-w-lg mt-4'>
          <button
            onClick={() => setShowDescription(!showDescription)}
            className=' px-4 py-2 rounded w-full cursor-pointer'
          >
            {showDescription
              ? "Hide Description"
              : "Show Description"
            }

            {showDescription && (
              <div className='border p-4 mt-2 rounded'>
                <p>{selectedCharacter.description}</p>
              </div>
            )}
          </button>


        </div>
      )}

      <div className='m-4 items-center flex flex-col'>

        <div className='flex gap-4'>
          <div>
            <label>Option 1</label>

            <input
              type="text"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              className='border p-2 ml-2'
            />
          </div>

          <div>
            <label>Option 2</label>

            <input
              type="text"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              className='border p-2 ml-2'
            />
          </div>
        </div>

        <button
          onClick={makeDecision}
          className="border px-4 py-2 mt-4 rounded cursor-pointer"
        >
          Decide
        </button>
      </div>

      {isThinking && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold">
            {selectedCharacter?.name} is thinking...
          </h2>

          <p>Considering both options...</p>
        </div>
      )}

      {story && (
        <div className='mt-8'>
          <h2 className='text-xl font-bold'>
            Character Decision
          </h2>
          <p>{story}</p>
        </div>
      )}
    </div>
  )
}
