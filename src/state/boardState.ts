import { create } from 'zustand'

import { CardData } from '@components/Board'

type Cards = Record<string, CardData>

interface BoardState {
  cards: Cards
  currentCard: CardData | null
  loadCards: (cards: Cards) => void
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'IMPOSSIBLE'
  isGameOver: boolean
  chooseDifficulty: (difficulty: BoardState['difficulty']) => void
  setGameOver: (isGameOver: boolean) => void
  checkCard: (card: CardData) => void
  clearSelectedCards: () => void
}

export const useBoardState = create<BoardState>((set) => ({
  cards: {},
  loadCards: (cards: Cards) => set({ cards }),
  difficulty: 'EASY',
  isGameOver: false,
  chooseDifficulty: (difficulty: BoardState['difficulty']) =>
    set({ difficulty }),
  setGameOver: (isGameOver: boolean) => set({ isGameOver }),
  currentCard: null,
  clearSelectedCards: () =>
    set((state) => {
      const cards = Object.values(state.cards).reduce(
        (cardList, card) => ({
          ...cardList,
          [card.id]: { ...card, selected: false },
        }),
        {},
      )
      return { ...state, cards }
    }),
  checkCard: (card: CardData) =>
    set((state) => {
      if (!state.currentCard) {
        return { ...state, currentCard: card }
      }

      if (state.currentCard.cardNumber === card.cardNumber) {
        const cards = {
          ...state.cards,
          [card.id]: { ...card, matched: true },
          [state.currentCard.id]: { ...state.currentCard, matched: true },
        }

        return { ...state, cards, currentCard: null }
      }

      return { ...state, currentCard: null }
    }),
}))
