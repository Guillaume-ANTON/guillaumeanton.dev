import ScraperTool from '../ScraperTool'

function WebScraperProject({ texts }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/2">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
            <span className="text-xl">🕷️</span> {texts.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {texts.description}
          </p>
          <p className="text-xs text-gray-400 italic">
             {texts.info}
          </p>
        </div>

        {/* Colonne droite : outil interactif */}
        <div className="md:w-1/2 w-full">
          <ScraperTool texts={texts.tool} />
        </div>
      </div>
    </div>
  )
}

export default WebScraperProject