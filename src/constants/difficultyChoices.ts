export type Difficulty = (typeof difficultyChoices)[number]
export const difficultyChoices = ['EASY', 'MEDIUM', 'HARD', 'IMPOSSIBLE']

type DifficultyChoice = {
  imgCount: number
  imgSize: number
}

export const difficultyBoardSize: Record<string, DifficultyChoice> = {
  EASY: {
    // 3x2
    imgCount: 3,
    imgSize: 300,
  },
  MEDIUM: {
    // 4x2
    imgCount: 4,
    imgSize: 250,
  },
  HARD: {
    // 5x2
    imgCount: 5,
    imgSize: 200,
  },
  IMPOSSIBLE: {
    // 5x4
    imgCount: 10,
    imgSize: 160,
  },
}
