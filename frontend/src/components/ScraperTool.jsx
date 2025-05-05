import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function ScraperTool({ texts }) {
  const [url, setUrl] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [fileLink, setFileLink] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)

  const tags = ['h1', 'h2', 'p', 'a', 'img']

  const handleCheckbox = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setFileLink(null)
    setProgress(0)
  
    const DURATION = 5000
    const INTERVAL = 50
    const totalSteps = DURATION / INTERVAL
    let step = 0
    let fileName = null
    let responseReceived = false
  
    const interval = setInterval(() => {
      step += 1
      const pct = Math.min(100, Math.round((step / totalSteps) * 100))
      setProgress(pct)
  
      if (pct >= 100 && responseReceived && fileName) {
        clearInterval(interval)
        setFileLink(`${API_URL}/api/download?file=${fileName}`)
        setLoading(false)
        setTimeout(() => setProgress(0), 1000)
      }
    }, INTERVAL)
  
    try {
      const res = await axios.post(`${API_URL}/api/scrape`, {
        url,
        tags: selectedTags,
      })
      fileName = res.data.file
      responseReceived = true
    } catch (err) {
      console.error("Erreur scraping:", err)
      setError(texts.error)
      clearInterval(interval)
      setLoading(false)
      setProgress(0)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={texts.placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />

        <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
            const isActive = selectedTags.includes(tag)
            return (
            <button
                key={tag}
                type="button"
                onClick={() => handleCheckbox(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition
                ${isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}
                `}
            >
                {tag}
            </button>
            )
        })}
        </div>

        <div className="flex items-center gap-3">
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? texts.loading : texts.submit}
            </button>

            {loading && (
                <span className="text-sm text-gray-600">{progress}%</span>
            )}
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {fileLink && (
        <a
          href={fileLink}
          className="block mt-4 text-blue-600 underline"
          download
        >
          {texts.download}
        </a>
      )}
    </div>
  )
}

export default ScraperTool
