import { create } from 'zustand'

import { CardData } from '@components/Board'

interface BoardState {
  cards: Record<number, CardData>
  loadCards: (cards: Record<number, CardData>) => void
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'IMPOSSIBLE'
  isGameOver: boolean
  chooseDifficulty: (difficulty: BoardState['difficulty']) => void
  setGameOver: (isGameOver: boolean) => void
  // pickCard: (cardId: number) => void,
}

export const useBoardState = create<BoardState>((set) => ({
  cards: {},
  loadCards: (cards: Record<number, CardData>) => set({ cards }),
  difficulty: 'EASY',
  isGameOver: false,
  chooseDifficulty: (difficulty: BoardState['difficulty']) =>
    set({ difficulty }),
  setGameOver: (isGameOver: boolean) => set({ isGameOver }),
}))
