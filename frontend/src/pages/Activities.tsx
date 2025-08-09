import { useParams } from "react-router-dom"
import type { IActivity } from "../interfaces/activity";
import agent from "../api/agent";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ActivityActions from "../components/ActivityActions";

const Activities = () => {
  const {studyId} = useParams();
  const [activities, setActivities] = useState<IActivity[]>([]);

  const { mutate: getActivities, isSuccess: isGetSuccess, isPending: isGetPending } = useMutation({
    mutationFn: (id: string) => {
      return agent.activities.listByStudy(id);
    },
    onSuccess: (res) => {
      console.log(res);
      setActivities(res);
    }
  })

  useEffect(() => {
    if (studyId) {
      getActivities(studyId);
    }
  }, [studyId]);  

  return (
    <main>
      {studyId}
      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative">
        {!isGetPending && isGetSuccess && (
          <>
            {activities.map((activity: IActivity) => (
              <ActivityActions key={activity._id} activity={activity} />
            ))}
          </>
        )}
        
      </div>
    </main>
  )
}

export default Activities