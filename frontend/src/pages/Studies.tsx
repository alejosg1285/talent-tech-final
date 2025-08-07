import StudyCard from "../components/StudyCard"

const Study = () => {
  return (
    <main>
      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative">
        <section id='studies'>
          <h2 className='tracking-wide text-center font-semibold text-2xl'>Estudios</h2>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Agregar</button>
          <div className="grid grid-cols-1 md:flex-row gap-4">
          <StudyCard key={1} />
          <StudyCard key={2} />
          <StudyCard key={3} />
          <StudyCard key={4} />
          </div>

        </section>
      </div>
    </main>
  )
}

export default Study