"use client";
import Button from "../ui/button";
import { Icons } from "../ui/icons";
import TaskForm from "./taskform";
import Searchbox from "../ui/searchbox";
import useTaskStore from "@/store/useTask";
import { TaskModel } from "@/shared/model/task.model";
import useCommonStore from "@/store/useCommon";
import TaskCard from "./taskcard";
import { ChangeEvent } from "react";



const TaskSection = () => {
  const { tasks, sortTasks } = useTaskStore(state=>state);
  const { isFormOpen, isEdit, setIsFormOpen } = useCommonStore(state=>state);

  return (
    <section className="container mx-auto w-full mt-5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 px-2 mb-5">
        <div className="flex flex-col flex-wrap sm:flex-row items-center gap-3">
            <Button
            value="Add"
            onClick={() => setIsFormOpen()}
            icon={<Icons.plus />}
            />

            <Button
            value="Clear all"
            onClick={() => alert("Not implemented")}
            icon={<Icons.circlexcheck />}
            />
            <select 
            title="choose priority" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e: ChangeEvent<HTMLSelectElement>)=>sortTasks(e.target.value)}
            >
                <option selected disabled>Sort</option>
                <option value="HIGH">High to Low</option>
                <option value="LOW">Low to High</option>
            </select>

          
        </div>
      </div>

      {isEdit || isFormOpen ? (
        <TaskForm />
      ) : (
        ""
      )}

      <div className="px-3">
        <div>
          {/* <Tab selectTab={selectTab} setSelectTab={setSelectTab} /> */}
          <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
              <div className="flex items-center justify-start">
                <h5 className="px-2 text-gray-500 w-full">
                  Total {tasks && tasks.length}
                </h5>
              </div>

              <div className="relative flex w-full md:w-1/3 flex-wrap items-end">
                <Searchbox />
              </div>
            </div>

            {tasks.length ?
                <div className="mb-4">
                <div className="px-2 mb-4 text-red-500 text-lg font-semibold">Pending</div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 rounded-md">
                    {tasks?.filter((task: TaskModel) => !task.isCompleted).map(task=><TaskCard key={task.id} task={task}/>)}
                </div>
            </div>
            :
            <div className="flex items-center justify-center min-h-[80vh] text-lg text-gray-500 text-center">
                <Icons.file className="me-2"/>No tasks 
            </div>
            }

            <div className="mb-4">
                <div className="px-2 mb-4 text-green-500 text-lg font-semibold">Completed</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 rounded-md">
                {tasks?.filter((task: TaskModel) => task.isCompleted).map(task=><TaskCard key={task.id} task={task}/>)}
                </div> 
            </div>
                

          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskSection;
