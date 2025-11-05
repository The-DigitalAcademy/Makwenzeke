export interface ToDo {
    id: string,
    description : string,
    status : ToDoCategory,
    date: string
}

export interface ToDoCategory {
    name: 'OVERDUE' | 'COMPLETED' | 'PENDING'
}