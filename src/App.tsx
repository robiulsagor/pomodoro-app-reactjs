import Home from "./pages/Home"

const App = () => {
  return (
    <>
      <title>Pomodaro App</title>

      <main className="w-full h-screen bg-[url(assets/bg-1.1.jpg)] bg-cover  flex items-center justify-center">
        <Home />
      </main>
    </>
  )
}

export default App