import { useEffect } from 'react'

import { create } from 'zustand'

import { buildCardData } from '@/utils/card'

// interface DialogState {
//   isOpen: boolean
//   setIsOpen: () => void
//   dialogContent: React.ReactNode
//   dialogTitle: string
//   handleDialog: ({
//     content,
//     title,
//   }: {
//     title: string
//     content: React.ReactNode
//   }) => void
//   handleDialogClose: () => void
// }

// export const useDialogStore = create<DialogState>((set) => ({
//   isOpen: false,
//   setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
//   dialogTitle: '',
//   dialogContent: null,
//   handleDialog: ({ title, content }) =>
//     set({ dialogTitle: title, dialogContent: content, isOpen: true }),
//   handleDialogClose: () => set({ dialogContent: null, isOpen: false }),
// }))

// export const DialogV2 = () => {
//   const dialogStore = useDialogStore()
//   const { isOpen, dialogContent, dialogTitle, handleDialogClose } = dialogStore

// What state do I need for my board and cards???

// shuffled cards
// selected card
// matched cards
// guesses
// level
// game over

interface CardProps {
  cardId: number
  matched: boolean
  selected: boolean
  // handleClick: (cardId: number) => void
  cardImage: string
  cardText: string
  cardColor: string
}

// interface BoardProps {
//   cards: CardProps[]
//   difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'IMPOSSIBLE'
//   isGameOver: boolean
// }

interface BoardState {
  cards: CardProps[]
  loadCards: (cards: CardProps[]) => void
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'IMPOSSIBLE'
  isGameOver: boolean
  chooseDifficulty: (difficulty: BoardState['difficulty']) => void
  setGameOver: (isGameOver: boolean) => void
  // pickCard: (cardId: number) => void,
}

export const useBoardState = create<BoardState>((set) => ({
  cards: [],
  loadCards: (cards: CardProps[]) => set({ cards }),
  difficulty: 'EASY',
  isGameOver: false,
  chooseDifficulty: (difficulty: BoardState['difficulty']) =>
    set({ difficulty }),
  setGameOver: (isGameOver: boolean) => set({ isGameOver }),
}))

const Card = () => {
  return <div className="w-1/4 h-1/2 border border-red-500">stuff</div>
}

export const Board = () => {
  const dialogStore = useBoardState()
  const { cards, loadCards } = dialogStore

  useEffect(() => {
    buildCardData().then((cardData) => {
      console.log(cardData)
    })
  }, [])

  return (
    <main className="flex grow flex-wrap overflow-hidden">
      {cards.map((card, i) => (
        <Card key={`${card.cardId}__${i}`} {...card} />
      ))}
    </main>
  )
}

Board.Card = Card
