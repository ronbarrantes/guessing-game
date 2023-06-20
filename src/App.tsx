import { Board } from '@/components/Board'
import { useBoardState } from '@/state/boardState'

const App = () => {
  const { guessCount } = useBoardState()

  return (
    <div className="flex h-screen w-screen flex-col p-2">
      <header>
        <div>Matching game</div>
      </header>
      <Board />
      <footer className="justify-center flex">
        <div>Guess count: {Math.floor(guessCount)}</div>
      </footer>
    </div>
  )
}

export default App
