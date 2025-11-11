import { useState } from 'react'
import { Upload, Loader2, Volume2, FileText, Languages, Download } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

export default function UploadPanel() {
  const [file, setFile] = useState(null)
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (e) => {
    e.preventDefault()
    setError('')
    if (!file) {
      setError('Please choose a PDF, DOCX, or TXT file.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    try {
      const res = await fetch(`${BACKEND_URL}/api/translate-upload`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.detail || 'Upload failed')
      }
      const data = await res.json()
      setJob(data.job)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto backdrop-blur-md bg-white/30 rounded-2xl p-6 shadow-xl border border-white/40">
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/60 rounded-xl cursor-pointer hover:border-white transition">
            <input
              type="file"
              accept=".pdf,.docx,.txt,.md"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Upload className="w-10 h-10 text-white" />
            <span className="text-white mt-2">Drop your PDF/DOCX/TXT here</span>
            {file && <span className="text-white/80 text-sm mt-1">{file.name}</span>}
          </label>
        </div>
        <button
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70 text-white font-semibold px-5 py-3 rounded-xl shadow-lg"
        >
          {loading ? <Loader2 className="animate-spin" /> : null}
          Translate & Generate Audio
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-100 bg-red-500/40 border border-red-400/60 rounded-lg p-3">{error}</div>
      )}

      {job && (
        <div className="mt-6 grid gap-4">
          <div className="flex items-center gap-2 text-white/90">
            <Languages className="w-5 h-5" />
            <span>Generated outputs</span>
          </div>
          {job.outputs?.map((o, idx) => (
            <div key={idx} className="bg-white/20 border border-white/40 rounded-xl p-4 text-white">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-semibold">{o.language}</span>
                <a href={o.text_path} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 hover:underline">
                  <FileText className="w-4 h-4" />
                  <span>Text</span>
                </a>
                <a href={o.audio_path} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
                  <Volume2 className="w-4 h-4" />
                  <span>Audio</span>
                </a>
                <a download href={o.audio_path} className="inline-flex items-center gap-1 hover:underline">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
              <p className="whitespace-pre-wrap text-white/90 text-sm max-h-40 overflow-auto">{o.translated_text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
