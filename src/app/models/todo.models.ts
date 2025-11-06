export interface ToDo {
    id: string,
    title: string,
    description : string,
    status :'OVERDUE' | 'COMPLETED' | 'PENDING'
    date: string
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    userID: string;
}


// used when creating a new ToDo task on the UI.
export type ToDoData = Omit<ToDo, 'id'| 'createdAt'| 'updatedAt'>;
