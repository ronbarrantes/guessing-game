import { Board } from '@/components/Board'
import { useBoardState } from '@/state/boardState'

const App = () => {
  const { guessCount, difficulty } = useBoardState()

  return (
    <div className="flex h-screen w-screen flex-col p-2">
      <header className="m-auto flex items-center justify-between lg:w-10/12">
        <h1 className="text-2xl">Matching game</h1>
        <span>Level: {difficulty}</span>
      </header>
      <Board />
      <footer className="flex justify-center">
        <div className="text-2xl">Guess count: {Math.floor(guessCount)}</div>
      </footer>
    </div>
  )
}

export default App
