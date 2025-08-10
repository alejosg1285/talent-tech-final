import { useParams } from "react-router-dom"
import NewActivityForm from "../components/NewActivityForm";

const NewActivity = () => {
  const { studyId } = useParams();

  return (
    <main>
      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative">
        <section id='new-study'>
          <h2 className='tracking-wide text-center font-semibold text-2xl'>Nuevo Actividad</h2>
          <NewActivityForm studyId={studyId!} />
        </section>
      </div>
    </main>
  )
}

export default NewActivity