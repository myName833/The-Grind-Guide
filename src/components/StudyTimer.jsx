"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

const StudyTimer = () => {
  const [time, setTime] = useState(0)
  const [inputMinutes, setInputMinutes] = useState("")
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    } else if (time === 0 && isActive) {
      setIsActive(false)
      alert("Time's up! Take a break or start another session.")
    }
    return () => clearInterval(interval)
  }, [isActive, time])
  
  const toggleTimer = () => {
    if (!isActive && time === 0 && inputMinutes) {
      setTime(Number.parseInt(inputMinutes) * 60)
    }
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setTime(0)
    setIsActive(false)
    setInputMinutes("")
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    if (/^\d*$/.test(value) && Number.parseInt(value) <= 180) {
      setInputMinutes(value)
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <Card className="mt-8 bg-teal-50 rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-teal-800">Study Timer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="text-6xl font-bold mb-4 text-teal-600">{formatTime(time)}</div>
        <div className="flex items-center space-x-2 mb-4">
          <Input
            type="number"
            placeholder="Enter minutes"
            value={inputMinutes}
            onChange={handleInputChange}
            className="w-32 bg-white"
            disabled={isActive}
          />
          <Button onClick={toggleTimer} className="bg-teal-500 hover:bg-teal-600 text-white">
            {isActive ? "Pause" : time > 0 ? "Resume" : "Start"}
          </Button>
          <Button onClick={resetTimer} className="bg-red-500 hover:bg-red-600 text-white">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default StudyTimer

