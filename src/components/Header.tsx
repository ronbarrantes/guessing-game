import { useBoardState } from '@/state/boardState'

export const Header = () => {
  const { difficulty, guessCount } = useBoardState()

  return (
    <header className="m-auto flex w-full items-center justify-between lg:w-10/12 ">
      <h1 className="text-2xl">Matching game</h1>
      <div className="text-2xl">Guess count: {Math.floor(guessCount)}</div>
      <div className="flex gap-2">
        <span>Level: {difficulty}</span>
      </div>
    </header>
  )
}
