import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { PriorityEnum, PriorityType, taskSchema } from "@/shared/schemas/task";
import * as z from "zod";
import useCommonStore from "@/store/useCommon";
import { add, format } from "date-fns";
import useTaskStore from "@/store/useTask";
import { useEffect } from "react";

type TaskSchema = z.infer<typeof taskSchema>;

const TaskForm = () => {
    const { addTask, task, updateTask, setTask } = useTaskStore(state=>state);
    const tomorrowDate = new Date(add(new Date(), { days: 1}).getTime());
    const { isEdit, setIsEdit, setIsFormOpen } = useCommonStore(state=>state);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
        } = useForm<TaskSchema>({
        resolver:zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            dueDate: tomorrowDate,
            priority: PriorityEnum[2],
            isCompleted: false
        }
    })
    
    const onSubmit: SubmitHandler<TaskSchema> = async (data) => { 
        if(isEdit && task){
            updateTask(task.id, data);
            resetTask();
        } else {
            addTask(data);
            setIsFormOpen();
        }
        reset();
    };

    const resetTask = ()=> {
        setIsEdit(false);
        setTask(null);
    }

    useEffect(()=>{
        if(task){
            setValue('title', task.title);
            setValue('description', task.description);
            setValue('dueDate', format(task.dueDate, 'yyyy-MM-dd'));
            setValue('priority', task.priority as PriorityType);
        }

    }, [isEdit, task])


  return (
    <div
      className="fixed bottom-0 left-0 top-0 right-0 flex items-center justify-center z-50 p-5 sm:p-12"
      style={{ background: "rgb(17 16 16 / 44%)" }}
    >
      <div className="mx-auto w-full sm:w-[400px] bg-white shadow-xl rounded-xl p-5">
        <div className="flex justify-between items-center pb-4 mb-4">
          <p className="font-semibold text-gray-700 text-xl">{ isEdit && task ? 'Update' :'Add' } task</p>
          <button
            title="Close form"
            className="bg-gray-400 rounded"
            onClick={() => {
                if(isEdit){
                resetTask();
                } else {
                    setIsFormOpen();
                }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fff"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              {...register('title')}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
                rows={5}
              className="resize-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              {...register('description')}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select 
            title="choose priority" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register('priority')}
            >
                {PriorityEnum.map((pr)=>(<option key={pr} value={pr}>{pr}</option>))}
            </select>
          </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                {...register('dueDate')}
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Due date
              </label>
          </div>
         
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isEdit && task ? 'Update': 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
