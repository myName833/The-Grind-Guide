"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

const Timer = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [inputTime, setInputTime] = useState("")

  const handleComplete = useCallback(() => {
    setIsRunning(false)
    onComplete()
  }, [onComplete])

  useEffect(() => {
    let timer

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            handleComplete()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isRunning, timeLeft, handleComplete])

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true)
    }
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(0)
    setInputTime("")
  }

  const handleSetTime = () => {
    const minutes = Number.parseInt(inputTime, 10)
    if (!isNaN(minutes) && minutes > 0) {
      setTimeLeft(minutes * 60)
      setInputTime("")
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-indigo-600">{formatTime(timeLeft)}</span>
      {!isRunning ? (
        <>
          <Input
            type="number"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            placeholder="Minutes"
            className="w-20 bg-white"
          />
          <Button size="sm" onClick={handleSetTime} className="bg-indigo-500 hover:bg-indigo-600 text-white">
            Set
          </Button>
          <Button
            size="sm"
            onClick={handleStart}
            disabled={timeLeft === 0}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Start
          </Button>
        </>
      ) : (
        <>
          <Button
            size="sm"
            variant="outline"
            onClick={handleStop}
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-50"
          >
            Stop
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            Reset
          </Button>
        </>
      )}
    </div>
  )
}

export default Timer

