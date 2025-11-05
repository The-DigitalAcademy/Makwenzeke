export interface ToDo {
    id: string,
    description : string,
    status :'OVERDUE' | 'COMPLETED' | 'PENDING'
    date: string
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    userID: string;
}

