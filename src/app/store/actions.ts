import { createAction, props } from "@ngrx/store";
import { ToDo } from "../models/todo.models";

export const addTask = createAction(
    '[ToDo] Add ToDo', 
    props <{task: ToDo }>()
);
export const toggleTask = createAction(
    '[ToDo] Toggle ToDo',
    props <{taskId: string}>()
);
export const removeTask = createAction(
    '[ToDo] Remove ToDo',
    props <{ taskId: string}>()
)
