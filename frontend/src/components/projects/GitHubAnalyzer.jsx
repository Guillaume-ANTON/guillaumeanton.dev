import { useState } from 'react'
import axios from 'axios'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF69B4']


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function GitHubAnalyzer( {texts} ) {
  const [username, setUsername] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await axios.get(`${API_URL}/api/github?username=${username}`)
      setData(res.data)
    } catch (err) {
      setError(texts.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-8">
      
      {/* Ligne 1 : description + formulaire */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Bloc description */}
        <div className="md:w-1/2">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
            <span className="text-xl">🐙</span> {texts.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {texts.description}
          </p>
          <p className="text-xs text-gray-400 italic">
            {texts.info}
          </p>
        </div>

        {/* Bloc formulaire */}
        <div className="md:w-1/2 w-full space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={texts.placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? texts.loading : texts.submit}
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>

      {/* Ligne 2 : résultats GitHub (à gauche) + placeholder à droite */}
      {data && (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Bloc résultats */}
          <div className="md:w-1/2 flex flex-col items-center text-gray-800">
            <img src={data.avatar_url} alt="avatar" className="w-20 h-20 rounded-full mb-4 border" />
            <div className="grid grid-cols-2 gap-4 mt-2 w-full">
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <p className="text-sm text-gray-500">{texts.repository}</p>
                <p className="text-lg font-bold">{data.public_repos}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <p className="text-sm text-gray-500">{texts.commit}</p>
                <p className="text-lg font-bold">{data.last_commit}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <p className="text-sm text-gray-500">{texts.stars}</p>
                <p className="text-lg font-bold">{data.total_stars}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <p className="text-sm text-gray-500">{texts.language}</p>
                <p className="text-lg font-bold">{data.most_used_language}</p>
              </div>
            </div>
          </div>

          {/* Bloc graph (optionnel) */}
          <div className="md:w-1/2 w-full">
            <div className="bg-gray-100 h-full w-full rounded shadow p-6 text-center text-gray-500">
            {data.languages_breakdown && (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                    <Pie
                        data={Object.entries(data.languages_breakdown).map(([name, value]) => ({ name, value }))}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                    >
                        {Object.keys(data.languages_breakdown).map((_, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    </PieChart>
                </ResponsiveContainer>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GitHubAnalyzer
