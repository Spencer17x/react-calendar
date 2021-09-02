import React, {useState} from 'react'
import './App.css'
import Calendar from "./components/calendar";

function App() {
  const [selectedDates, setSelectedDates] = useState();
  return (
    <div className="App">
      <h1>hello calendar</h1>
      <div style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
        <Calendar/>
      </div>
    </div>
  )
}

export default App
