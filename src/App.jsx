import Spline from '@splinetool/react-spline'
import UploadPanel from './components/UploadPanel'

function App() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-800 overflow-hidden">
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <Spline scene="https://prod.spline.design/Sn7gKzB2l1-3D-Placeholder/scene.splinecode" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-200 drop-shadow-lg">
            AI Translator & Audio Generator
          </h1>
          <p className="text-violet-100/90 mt-3 max-w-2xl">
            Upload a document in English. We’ll translate it to Hindi, Telugu, and Kannada, and generate audio for each language.
          </p>
        </div>
        <UploadPanel />
        <p className="mt-6 text-violet-200/80 text-sm">Supported: PDF, DOCX, TXT</p>
      </div>
    </div>
  )
}

export default App
