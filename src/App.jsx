"use client"
import TodoList from "./components/TodoList"
import Calendar from "./components/Calendar"
import StudyTimer from "./components/StudyTimer"


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <TodoList />
          <StudyTimer />
          
        </div>
        <div className="space-y-8">
          <Calendar />
        </div>
      </div>
    </main>
  )
}

