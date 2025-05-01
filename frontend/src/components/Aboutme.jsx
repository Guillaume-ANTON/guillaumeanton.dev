function Aboutme({ texts }) {
    return (
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 className="flex items-center text-2xl font-mono text-gray-800 mb-6">
                    <span className="whitespace-nowrap">def AboutMe():</span>
                    <span className="ml-4 h-0.5 bg-gray-300 flex-grow"></span>
                </h2>
                <p className="mb-4 font-light">{texts.desc}</p>
                <p className="mb-4 font-medium">{texts.desc2}</p>
            </div>
        </div>
    </section>
    );
  }
  
  export default Aboutme;