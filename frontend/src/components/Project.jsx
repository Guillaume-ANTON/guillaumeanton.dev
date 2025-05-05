import WebScraper from "./projects/WebScraper";

function Projects({ texts }) {
    return (
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 className="flex items-center text-2xl font-mono text-gray-800 mb-6">
                    <span className="whitespace-nowrap">for project in Projects:</span>
                    <span className="ml-4 h-0.5 w-full max-w-[300px] bg-gray-300"></span>
                </h2>
            </div>
            <div className="space-y-12">
                <WebScraper texts={texts.scraper}/>
            </div>
        </div>
    </section>
    );
  }
  
  export default Projects;