import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import * as z from "zod";
import type { IActivityType } from "../interfaces/activityType";
import agent from "../api/agent";
import type { IActivityRequestDto } from "../interfaces/activity";
import { useState } from "react";

interface Props {
  studyId: string
};

const NewActivityForm = ({ studyId }: Props) => {
  const navigate = useNavigate();
  const [messageCreate, setMessageCreate] = useState<string>('');
  const [errorCreate, setErrorCreate] = useState<string>('');
    
  const { data: typesList, error: isErrorList, isLoading: isLoadingList } = useQuery<IActivityType[]>({
    queryKey: ['getActivitiesType'],
    queryFn: async () => {
      const data = await agent.typesActivity.getAll();
      console.log(data?.activityTypes);
      return data?.activityTypes;
    }
  });
  const { mutate: createActivityMutation, isSuccess: isSuccessCreateActivity, isPending: isPendingCreateActivity } = useMutation({
    mutationFn: (activity: IActivityRequestDto) => {
     return agent.activities.create(activity);
    },
    onSuccess: () => {
      setMessageCreate('Actividad creada correctamente');

      setTimeout(() => {
        handleCancel();
      }, 5000);
    },
    onError: (err) => {
      console.log(err);
      setErrorCreate('Ocurrio un error al crear la actividad');
    }
  });

  const handleCancel = () => {
    navigate(`/activities/${studyId}`);
  };
  
  const onSubmit = (data: IFormActivity) => {
    const activity: IActivityRequestDto = {
      name: data.name,
      description: data.description,
      time_diary: parseInt(data.time_diary),
      study: studyId,
      study_type: data.study_type
    };
    //console.log(data, activity);
    createActivityMutation(activity);
  }

  const FormSchema = z.object({
    name: z
      .string()
      .min(5, 'El nombre de la actividad debe tener al menos 5 carácteres')
      .max(30, 'El nombre de la actividad no debe ser mayor a 30 carácteres'),
    description: z.string(),
    time_diary: z.string(),
    study_type: z.string(),
  });

  type IFormActivity = z.infer<typeof FormSchema>;

  const { register, handleSubmit, formState: { errors }} = useForm<IFormActivity>({
    resolver: zodResolver(FormSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {studyId}
      <div className="space-y-12">
        {!isPendingCreateActivity && errorCreate && (
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{ errorCreate }.</span>
            </div>
          </div>
        )}
        {!isPendingCreateActivity && messageCreate && (
          <div className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{ messageCreate }.</span>
            </div>
          </div>
        )}

        <div className="border-b border-white/10 pb-2">

          <div className="col-span-full">
            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Nombre</label>
            <div className="mt-2">
              <input id="name"
                type="text"
                {...register('name')}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
          </div>
          {errors?.name?.message && (
            <p className="text-red-700 mb-4">{errors.name.message}</p>
          )}

          <div className="col-span-full">
            <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">Descripci&oacute;n</label>
            <div className="mt-2">
              <textarea id="description"
                {...register('description')}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                ></textarea>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="time_diary" className="block text-sm/6 font-medium text-gray-900">Tiempo actividad</label>
              <div className="mt-2">
                <input id="time_diary"
                  {...register('time_diary')}
                  type="number"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {errors?.time_diary?.message && (
                <p className="text-red-700 mb-4">{errors.time_diary.message}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="study_type" className="block text-sm/6 font-medium text-gray-900">Tipo de actividad</label>
              <div className="mt-2 grid grid-cols-1">
                <select id="study_type"
                  {...register('study_type')}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  {!isLoadingList && typesList && (
                    <>
                      {typesList.map((item: IActivityType) => (
                        <option value={item._id}>{item.type}</option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              {errors?.study_type?.message && (
                <p className="text-red-700 mb-4">{errors.study_type.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" onClick={handleCancel} className="text-sm/6 font-semibold text-gray-900">Cancelar</button>
        <button type="submit" onClick={handleSubmit(onSubmit)} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Guardar</button>
      </div>
    </form>
  )
}

export default NewActivityForm