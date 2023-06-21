import { useEffect, useState } from 'react'

import { Card, LoadingPage, Overlay } from '@components'

import { useBoardState } from '@/state/boardState'
import { buildCardData } from '@/utils/card'
import { getEmoji } from '@/utils/emoji'

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
    return <LoadingPage />
  }

  const cardEmoji = getEmoji()

  return (
    <main className="m-auto flex h-full grow flex-wrap overflow-hidden border border-red-500 2xl:w-10/12">
      {isGameOver && (
        <Overlay title="Game Over">
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => {
              resetGame()
              loadCards(cards)
              setLoading(true)
            }}
          >
            Play Again
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
