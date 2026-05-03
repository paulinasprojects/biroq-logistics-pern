import { toast } from "sonner"

function App() {
  return (
    <div>
      Hello World
      <button onClick={() => toast.success("Clicked")}>Click me</button>
    </div>
  )
}

export default App
