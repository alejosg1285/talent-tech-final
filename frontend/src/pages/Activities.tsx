import { useParams } from "react-router-dom"
import type { IActivity } from "../interfaces/activity";
import agent from "../api/agent";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ActivityActions from "../components/ActivityActions";
import type { IStudy } from "../interfaces/study";

const Activities = () => {
  const {studyId} = useParams();
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [study, setStudy] = useState<IStudy>();

  const { mutate: getActivities, isSuccess: isGetSuccess, isPending: isGetPending } = useMutation({
    mutationFn: (id: string) => {
      return agent.activities.listByStudy(id);
    },
    onSuccess: (res) => {
      //console.log(res);
      setActivities(res);
    }
  });
  const { mutate: getStudy, isSuccess: isStudySuccess, isPending: isStudyPending } = useMutation({
    mutationFn: (id: string) => {
      return agent.studies.byId(id);
    },
    onSuccess: (res) => {
      setStudy(res?.studyDb);
    }
  });

  useEffect(() => {
    if (studyId) {
      getActivities(studyId);
      getStudy(studyId);
    }
  }, [studyId]);  

  return (
    <main>
      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative">
        {!isStudyPending && isStudySuccess ? (
          <>
            <h2 className="text-4xl font-extrabold text-black">{ study?.name }</h2>
            <p className="my-4 text-lg text-gray-500"><span className="font-semibold">Descripción:</span> { study?.description }</p>
            <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400"><span className="font-semibold">Objectivos:</span> { study?.objective }</p>
          </>
        ) : (
          <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
          </div>
        )}
        {!isGetPending && isGetSuccess ? (
          <>
            {activities.map((activity: IActivity) => (
              <ActivityActions key={activity._id} activity={activity} />
            ))}
          </>
        ) : (
          <div role="status" className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
              <div className="flex items-center justify-between">
                  <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                  <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                  <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                  <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <span className="sr-only">Loading...</span>
          </div>
        )}
        
      </div>
    </main>
  )
}

export default Activities