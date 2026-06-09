'use client'

import { useEffect, useState, useRef } from 'react'

import CharacterSelector from './components/CharacterSelector'
import CharacterDescription from './components/CharacterDescription'
import DecisionForm from './components/DecisionForm'
import ThinkingState from './components/ThinkingState'
import StoryResult from './components/StoryResult'
import CharacterAvatar from './components/CharacterAvatar'

import { Character } from './types/Character'

import { fetchCharacters } from './services/characters'
import { makeDecisionRequest } from './services/decisions'

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [option1, setOption1] = useState("")
  const [option2, setOption2] = useState("")

  const [story, setStory] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [showDescription, setShowDescription] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadCharacters()
  }, [])

  useEffect(() => {
    if (story) {
      resultRef.current?.scrollIntoView({
        behavior: "smooth"
      })
    }
  }, [story])

  const loadCharacters = async () => {
    const data = await fetchCharacters()
    setCharacters(data)
  }

  const makeDecision = async () => {
    setError("")
    setStory("")

    if (!selectedCharacter) {
      setError("Choose a character before making a decision.")
      return
    }

    if (!option1.trim() || !option2.trim()) {
      setError("Fill both options.")
      return
    }

    setIsThinking(true)

    try {
      const data = await makeDecisionRequest(
        selectedCharacter,
        option1,
        option2
      )

      setStory(data.story)

    } finally {
      setIsThinking(false)
    }
  }

  return (
    <div className='p-8 flex flex-col items-center'>

      <h1 className='p-8 flex flex-col items-center'>
        Make decisions using the personality of your characters!
      </h1>

      <CharacterAvatar
        character={selectedCharacter}
      />

      <CharacterSelector
        characters={characters}
        onSelect={(character) => {
          setSelectedCharacter(character)
          setShowDescription(false)
        }}
      />

      {selectedCharacter && (
        <CharacterDescription
          character={selectedCharacter}
          open={showDescription}
          onToggle={() =>
            setShowDescription(!showDescription)
          }
        />
      )}

      <DecisionForm
        option1={option1}
        option2={option2}
        setOption1={setOption1}
        setOption2={setOption2}
        onSubmit={makeDecision}
        disabled={isThinking}
      />

      {error && (
        <div
          className='mt-4 border 
        border-red-500 bg-red-100 
        text-red-700 px-4 py-3 rounded'>
          {error}
        </div>
      )}

      {isThinking && (
        <ThinkingState
          name={selectedCharacter?.name}
        />
      )}

      <div ref={resultRef}>
        {story && (
          <StoryResult
            story={story}
          />
        )}
      </div>
    </div>
  )
}