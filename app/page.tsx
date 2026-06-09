'use client'

import { useEffect, useState } from 'react'

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

  const [option1, setOption1] = useState("")
  const [option2, setOption2] = useState("")

  const [story, setStory] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [showDescription, setShowDescription] = useState(false)

  useEffect(() => {
    loadCharacters()
  }, [])

  const loadCharacters = async () => {
    const data = await fetchCharacters()
    setCharacters(data)
  }

  const makeDecision = async () => {
    if (!selectedCharacter) return

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

      {isThinking && (
        <ThinkingState
          name={selectedCharacter?.name}
        />
      )}

      {story && (
        <StoryResult
          story={story}
        />
      )}
    </div>
  )
}