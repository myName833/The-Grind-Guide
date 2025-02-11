import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

const RecentAssignments = ({ assignments }) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-800">Recent Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {assignments.map((assignment, index) => (
            <li key={index} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
              <span className="text-gray-700">{assignment.text}</span>
              <span className="text-sm text-indigo-600">{new Date(assignment.completedDate).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default RecentAssignments

