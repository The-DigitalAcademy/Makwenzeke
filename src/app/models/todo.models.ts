export interface ToDo {
    id: string,
    description : string,
    status : ToDoCategory,
    date: string
}

export interface ToDoCategory {
    name: 'OVERDUE' | 'COMPLETED' | 'PENDING'
}

// used when creating a new ToDo task on the UI.
export type ToDoData = Omit<ToDo, 'id'>;