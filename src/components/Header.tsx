import { Select } from '@components'

import { difficultyChoices } from '@/constants/difficultyChoices'
import { useBoardState } from '@/state/boardState'

export const Header = () => {
  const { difficulty, guessCount, setDifficulty } = useBoardState()

  return (
    <header className="m-auto flex w-full items-center justify-between border border-green-500 lg:w-10/12 ">
      <h1 className="text-2xl">Matching game</h1>
      <div className="text-2xl">Guess count: {Math.floor(guessCount)}</div>
      <div className="flex gap-2">
        <span>Level: {difficulty}</span>
        <Select
          name="difficulty"
          setSelection={setDifficulty}
          selectChoices={difficultyChoices}
        />
      </div>
    </header>
  )
}
