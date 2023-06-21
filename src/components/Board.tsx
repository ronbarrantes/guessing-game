import { useEffect, useState } from 'react'

import {
  Card,
  LoadingPage,
  Overlay,
  // Select
} from '@components'

// import { difficultyChoices } from '@/constants/difficultyChoices'
import { useBoardState } from '@/state/boardState'
import { buildCardData } from '@/utils/card'
import { getEmoji } from '@/utils/emoji'

export const Board = () => {
  const [emoji, setEmoji] = useState('')

  const {
    cards,
    loadCards,
    checkCard,
    boardDisabled,
    increaseGuessCount,
    gamesPlayed,
    setGameOver,
    isGameOver,
    clearSelectedCards,
    resetGame,
  } = useBoardState()

  const hasLoadedCards = Object.keys(cards).length > 0
  const allCardsMatched = Object.values(cards).every((card) => card.matched)

  useEffect(() => {
    if (hasLoadedCards && allCardsMatched) setGameOver(allCardsMatched)

    if (boardDisabled) {
      setTimeout(() => {
        clearSelectedCards()
      }, 1000)
    }
  }, [
    allCardsMatched,
    boardDisabled,
    clearSelectedCards,
    hasLoadedCards,
    setGameOver,
  ])

  if (!isGameOver && !hasLoadedCards) {
    return <LoadingPage />
  }

  return (
    <main className="flex flex-wrap h-full m-auto overflow-hidden grow 2xl:w-10/12">
      {isGameOver && (
        <Overlay title={gamesPlayed === 0 ? 'Wanna Play?' : 'Play Again?'}>
          <p>Games played {gamesPlayed}</p>

          {/* 
          TODO: add the difficulty level
          <Select
            name="difficulty"
            setSelection={setDifficulty}
            selectChoices={difficultyChoices}
          /> */}

          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={async () => {
              resetGame()
              setEmoji(getEmoji())
              const cards = await buildCardData()
              loadCards(cards)
            }}
          >
            {gamesPlayed === 0 ? 'Start' : 'Play Again'}
          </button>
        </Overlay>
      )}
      {Object.values(cards).map((card) => {
        const id = card.id
        return (
          <Card
            key={id}
            disabled={boardDisabled}
            {...card}
            cardEmoji={emoji}
            handleMatch={() => {
              checkCard(cards[id])
              increaseGuessCount()
            }}
          />
        )
      })}
    </main>
  )
}
