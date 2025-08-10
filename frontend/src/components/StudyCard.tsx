import { Link } from "react-router-dom"
import type { IStudy } from "../interfaces/study"

interface Props {
    study: IStudy
}

const StudyCard = ({ study }: Props) => {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="./img/school.jpg" alt="" />
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ study.name }</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <span className="text-white font-semibold">Descripci&oacute;n</span>: { study.description }
            </p>
            {study.tags && (
                <div className="flex flex-row gap-2 mb-2">
                    {study.tags.map((tag: string) => (
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 w-max-content" key={tag}>#{tag}</span>
                    ))}
                </div>
            )}
            
            <Link to={`/activities/${study._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-max-content">
                Actividades
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
        </div>
    </div>
  )
}

export default StudyCard