import { Board, Footer, Header } from '@components'

export const App = () => {
  return (
    <div className="flex h-screen w-screen flex-col p-2">
      <Header />
      <Board />
      <Footer />
    </div>
  )
}
