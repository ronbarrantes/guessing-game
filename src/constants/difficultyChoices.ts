export type Difficulty = (typeof difficultyChoices)[number]
export const difficultyChoices = ['EASY', 'MEDIUM', 'HARD', 'IMPOSSIBLE']

export const difficultyBoardSize: Record<string, number> = {
  EASY: 3, // 3x2
  MEDIUM: 4, // 4x2
  HARD: 5, // 5x2
  IMPOSSIBLE: 10, // 5x4
  // IMPOSSIBLE: 15, // 5x6
}
