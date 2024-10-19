
export interface TaskModel {
    id: string;
    title: string;
    description: string;
    dueDate: Date | string;
    priority: string;
    isCompleted: boolean;
    createdAt?: Date;
}