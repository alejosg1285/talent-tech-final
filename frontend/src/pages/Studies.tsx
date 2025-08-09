import { useQuery } from "@tanstack/react-query"
import StudyCard from "../components/StudyCard"
import type { IStudy } from "../interfaces/study"
import agent from "../api/agent"
import { useNavigate } from "react-router-dom"

const Study = () => {
  const navigate = useNavigate();

  const { data: studiesList, error: studiesError, isLoading: isStudiesLoading } = useQuery<IStudy[]>({
    queryKey: ['getStudies'],
    queryFn: async() => {
      const data = await agent.studies.list();
      /*data?.studies?.map((study: any) => {
        console.log(study);
      })
      console.log(data);*/
      return data?.studies;
    }
  });

  const handleNewStudy = () => {
    navigate('/study/new');
  };

  return (
    <main>
      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative">
        <section id='studies'>
          <h2 className='tracking-wide text-center font-semibold text-2xl'>Estudios</h2>
          <button type="button" onClick={handleNewStudy} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Agregar</button>
          
          {!isStudiesLoading && studiesList && (
            <div className="grid grid-cols-1 md:flex-row gap-4">
              {studiesList.map((study: IStudy) => (
                <StudyCard key={study._id} study={study} />
              ))}
            </div>
          )}

        </section>
      </div>
    </main>
  )
}

export default Study