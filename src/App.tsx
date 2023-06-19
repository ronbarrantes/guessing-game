import { Board } from '@/components/Board'

import './App.css'

// ADD THE CARDS COMPONENT
// ADD THE TITLE
// ADD THE LEVEL EASY MEDIUM HARD
// ADD THE GUESSES

const App = () => {
  return (
    <div className="flex h-screen w-screen flex-col p-2 py-2' border border-red-500">
      <header>
        <div>Title</div>
      </header>
      <Board />
      <footer>
        <div>Footer</div>
      </footer>
    </div>
  )
}

export default App
