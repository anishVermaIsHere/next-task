import { FC, useId } from 'react';
import card from './taskcard.module.css';
import { TaskModel } from '@/shared/model/task.model';
import useTaskStore from '@/store/useTask';
import { format } from 'date-fns';
import Tag from './tag';
import { Icons } from '../ui/icons';
import useCommonStore from '@/store/useCommon';

type CardProps={
    task: TaskModel;
}



const TaskCard:FC<CardProps> = ({ task }:CardProps) => {
    const commonDateFormat=format(task.dueDate, 'dd-MM-yyyy');
    const { deleteTask, completeTask, setTask, tasks } = useTaskStore(state=>state);
    const { setIsEdit } = useCommonStore(state=>state);


    const editTask =(id: string)=>{
      setIsEdit(true);
      setTask(task);
    }
  return (
    <>
    <div className={card.card}>
        <div className={card.cardHead}>
            <button aria-label='complete task' title='complete task' className={`${card.checkMark}`} onClick={()=>completeTask(task.id)}>
                <Icons.circlecheck className={task.isCompleted ? card.completed : card.pending} />
            </button>
            <p className='ms-4 truncate'>{task.title}</p>            
        </div>
        
        <div className={card.cardBody}>
             <p className='text-gray-500 pb-3'>{task.description}</p>
             <div className='py-2'>
                <Tag status={task.priority}/>
             </div>
        </div>
        <div className={card.cardFooter}>
             <p className='text-red-400 text-sm'>Deadline: {commonDateFormat}</p>
             <ul className={card.taskActionList}>                
                {!task.isCompleted?<button aria-label="edit-task" onClick={()=>editTask(task.id)}>
                    <Icons.pencil className='w-5 h-5'/>
                </button>:''}
                <button aria-label="delete-task" onClick={()=>deleteTask(task.id)}>
                    <Icons.trash className='w-5 h-5'/>
                </button>
            </ul>
        </div>
    </div>
    </>
  )
}

export default TaskCard