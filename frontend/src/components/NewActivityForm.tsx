import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import * as z from "zod";
import type { IActivityType } from "../interfaces/activityType";
import agent from "../api/agent";
import type { IActivityRequestDto } from "../interfaces/activity";
import { useState } from "react";
import Utils from "../utils/Utils";

interface Props {
  studyId: string
};

const NewActivityForm = ({ studyId }: Props) => {
  const navigate = useNavigate();
  const [messageCreate, setMessageCreate] = useState<string>('');
  const [errorCreate, setErrorCreate] = useState<string>('');
  const [activityDto, setActivityDto] = useState<IActivityRequestDto>();
  const [newActivityType, setNewActivityType] = useState<boolean>(false);
    
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
  const { mutate: createTypeActivityMutation, isSuccess: isSuccessCreateType, isPending: isPendingCreateType } = useMutation({
    mutationFn: (type: IActivityType) => {
      return agent.typesActivity.create(type);
    },
    onSuccess: (res) => {
      console.log(res);
      const activity: IActivityRequestDto = activityDto!
      activity.study_type = res._id!;
      createActivityMutation(activity);
    },
    onError: (err) => {
      console.error(err);
    }
  })

  const handleCancel = () => {
    navigate(`/activities/${studyId}`);
  };

  const toggleNewActivityType = () => {
    setNewActivityType(!newActivityType);
  }
  
  const onSubmit = (data: IFormActivity) => {
    if (newActivityType) {
      const typeActivity: IActivityType = {
        type: data.study_type
      };
      createTypeActivityMutation(typeActivity);
    }
    console.info(isPendingCreateType);
    const activity: IActivityRequestDto = {
      name: data.name,
      description: data.description,
      time_diary: Utils.convertHoursMinutesToSeconds(parseInt(data.time_hour), parseInt(data.time_minute)),
      study: studyId,
      study_type: data.study_type
    };

    if (newActivityType) {
      setActivityDto(activity);
    } else {
      createActivityMutation(activity);
    }
  }

  const FormSchema = z.object({
    name: z
      .string()
      .min(5, 'El nombre de la actividad debe tener al menos 5 carácteres')
      .max(30, 'El nombre de la actividad no debe ser mayor a 30 carácteres'),
    description: z.string(),
    time_hour: z
      .string()
      .trim(),
    time_minute: z
      .string()
      .trim(),
    study_type: z.string(),
  }).superRefine((data, ctx) => {
    if (data.time_hour.length === 0 && data.time_minute.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe ingresar al menos una hora o minuto de actividad',
        path: ['time_hour']
      });
    }

    if (isNaN(parseInt(data.time_hour))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe ingresar una hora de actividad valida',
        path: ['time_hour']
      });
    } else {
      const val = parseInt(data.time_hour);
      if (val <= 0 || val > 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debe ingresar una hora de actividad entre 1 y 12',
          path: ['time_hour']
        });
      }
    }

    if (isNaN(parseInt(data.time_minute))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe ingresar una hora de actividad valida',
        path: ['time_minute']
      });
    } else {
      const val = parseInt(data.time_minute);
      if (val <= 1 || val > 60) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debe ingresar minutos de actividad entre 1 y 60',
          path: ['time_minute']
        });
      }
    }

    if (newActivityType && data.study_type.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe ingresar el tipo de actividad',
        path: ['study_type']
      })
    }
  });

  type IFormActivity = z.infer<typeof FormSchema>;

  const { register, handleSubmit, formState: { errors }} = useForm<IFormActivity>({
    resolver: zodResolver(FormSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              <label htmlFor="time_hour" className="block text-sm/6 font-medium text-gray-900">Tiempo actividad</label>
              <div className="mt-2 grid-rows-1">
                <input id="time_hour"
                  {...register('time_hour')}
                  type="number"
                  placeholder="Hours"
                  className="max-w-24 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <span className="text-sm/6 font-medium text-gray-900 mx-2">hh</span>
                <input id="time_minute"
                  {...register('time_minute')}
                  type="number"
                  placeholder="Minutes"
                  className="max-w-24 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <span className="text-sm/6 font-medium text-gray-900 mx-2">mm</span>
              </div>
              {errors?.time_hour?.message && (
                <p className="text-red-700 mb-4">{errors.time_hour.message}</p>
              )}
              {errors?.time_minute?.message && (
                <p className="text-red-700 mb-4">{errors.time_minute.message}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="study_type" className="block text-sm/6 font-medium text-gray-900">Tipo de actividad</label>
              <div className="mt-2 grid grid-cols-1">
                {!newActivityType ? (
                  <select id="study_type"
                    {...register('study_type')}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {!isLoadingList && typesList && (
                      <>
                        {typesList.map((item: IActivityType) => (
                          <option value={item._id} key={item._id}>{item.type}</option>
                        ))}
                      </>
                    )}
                    <option onClick={toggleNewActivityType}>Nuevo tipo</option>
                  </select>
                ) : (
                  <div className="relative w-full">
                    <input id="new_study_type"
                      {...register('study_type')}
                      type="text"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="Tipo actividad" />
                    <button type="submit" onClick={toggleNewActivityType} className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                    </button>
                </div>
                )}
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