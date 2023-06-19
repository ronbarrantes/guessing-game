import { useEffect, useState } from 'react'

import { Card } from '@/components/Card'
import { useBoardState } from '@/state/boardState'
import { buildCardData } from '@/utils/card'
import { LoadingPage } from './Loaders'

const emojis = ['😄', '🧐', '😎', '😂', '😊', '🥳', '😳']

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

  const cardEmoji = emojis[Math.floor(Math.random() * emojis.length)]

  if (loading) {
    console.log('CARDS', cards)
    return <LoadingPage />
  }

  return (
    <main className="flex grow h-full flex-wrap overflow-hidden">
      {isGameOver && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col gap-3 bg-white p-4 rounded-lg text-black z-20  shadow-lg shadow-black">
            <h2 className="text-center text-6xl">Game Over</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
            cardEmoji={cardEmoji}
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
