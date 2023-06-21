import classNames from 'classnames'

import { useBoardState } from '@/state/boardState'

interface DifficultyButtonProps {
  difficulty: string
  setDifficulty: () => void
}

const difficultyColors: Record<string, string> = {
  EASY: 'hover:bg-green-400 border-green-700',
  MEDIUM: 'hover:bg-yellow-400 border-yellow-700',
  HARD: 'hover:bg-red-400 border-red-700',
  IMPOSSIBLE: 'hover:bg-fuchsia-400 border-fuchsia-700',
}

const difficultyColorsSelected: Record<string, string> = {
  EASY: 'bg-green-400',
  MEDIUM: 'bg-yellow-400',
  HARD: 'bg-red-400',
  IMPOSSIBLE: 'bg-fuchsia-400',
}

export const DifficultyButton = ({
  difficulty,
  setDifficulty,
}: DifficultyButtonProps) => {
  const { difficulty: selectedDifficulty } = useBoardState()

  return (
    <button
      onClick={setDifficulty}
      className={classNames(
        'w-fit rounded-md border-2 p-2 py-1',
        difficultyColors[difficulty],
        selectedDifficulty === difficulty &&
          difficultyColorsSelected[difficulty],
      )}
    >
      {difficulty}
    </button>
  )
}
