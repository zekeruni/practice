import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card';

let myObj = {
  name: "zekeruni",
  age: 20,
  address: {
    city: "Raipur",
    state: "Chhattisgarh",
    country: "India"
  }
}

let newArr = [1,2,3,4,5,6,7,8,9]
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-3xl bg-green-500 p-3 rounded-md'>Vite with Tailwind</h1>
      <Card username="zekeruni" myArr={newArr} />
      <Card post="React Dev" />
      <Card  />
    </>
  )
}

export default App
