import { useNavigate } from "react-router-dom"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const NewStudyForm = () => {
    const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  const FormSchema = z.object({
    name: z
        .string()
        .min(5, 'El nombre de estudio debe tener al menos 5 carácteres')
        .max(30, 'El nombre de estudio no debe ser mayor a 30 carácteres'),
    description: z.string(),
    objective: z.string(),
    tags: z.string()
  });

  type IFormStudy = z.infer<typeof FormSchema>;

  const { register, handleSubmit, formState: { errors }} = useForm<IFormStudy>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: IFormStudy) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
            <div className="border-b border-white/10 pb-12">

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

                <div className="col-span-full">
                    <label htmlFor="objective" className="block text-sm/6 font-medium text-gray-900">Objetivos</label>
                    <div className="mt-2">
                        <textarea id="objective"
                            {...register("objective")}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            ></textarea>
                    </div>
                </div>

                <div className="col-span-full">
                    <label htmlFor="tags" className="block text-sm/6 font-medium text-gray-900">Tags</label>
                    <div className="mt-2">
                        <input id="tags"
                            type="text"
                            {...register("tags")}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
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

export default NewStudyForm