"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../components/ui/card"

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
]

const MotivationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, 10000) // Change quote every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="mt-8 bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
      <CardContent className="p-6">
        <p className="text-2xl font-bold mb-4 italic">"{currentQuote.text}"</p>
        <p className="text-lg text-right">- {currentQuote.author}</p>
      </CardContent>
    </Card>
  )
}

export default MotivationalQuote

