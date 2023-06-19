import { useEffect, useState } from 'react'

import { Card } from '@/components/Card'
import { useBoardState } from '@/state/boardState'
import { buildCardData } from '@/utils/card'
import { LoadingPage } from './Loaders'

// BOARD
export const Board = () => {
  const dialogStore = useBoardState()
  const [loading, setLoading] = useState(true)
  const {
    cards,
    loadCards,
    checkCard,
    boardDisabled,
    increaseGuessCount,
    setGameOver,
    isGameOver,
    clearSelectedCards,
    resetGame,
  } = dialogStore

  useEffect(() => {
    if (!loading) return
    buildCardData().then((cardData) => {
      loadCards(cardData)
      setLoading(false)
    })
  }, [loadCards, setLoading, loading])

  useEffect(() => {
    const hasMatchedCards = Object.values(cards).every((card) => card.matched)
    setGameOver(hasMatchedCards)

    if (boardDisabled) {
      setTimeout(() => {
        clearSelectedCards()
      }, 1000)
    }
  }, [
    boardDisabled,
    cards,
    increaseGuessCount,
    clearSelectedCards,
    setGameOver,
  ])

  if (loading) {
    console.log('CARDS', cards)
    return <LoadingPage />
  }

  return (
    <main className="flex grow h-full flex-wrap overflow-hidden">
      {isGameOver && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg text-black">
            <h2>Game Over</h2>
            <button
              onClick={() => {
                resetGame()
                loadCards(cards)
                setLoading(true)
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      {Object.values(cards).map((card) => {
        const id = card.id
        return (
          <Card
            key={id}
            disabled={boardDisabled}
            {...card}
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
