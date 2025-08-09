import NewStudyForm from "../components/NewStudyForm"

const NewStudy = () => {
  return (
    <main>
      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative">
        <section id='new-study'>
          <h2 className='tracking-wide text-center font-semibold text-2xl'>Nuevo Estudio</h2>
          <NewStudyForm />
        </section>
      </div>
    </main>
  )
}

export default NewStudy