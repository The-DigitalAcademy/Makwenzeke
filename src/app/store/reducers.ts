import { createReducer, on } from "@ngrx/store";
import * as Actions from './actions';
import { ToDo } from "../models/todo.models";

export interface TaskState { 
    tasks: ToDo[];
}
export const  initialState: TaskState = {
    tasks: []
};
export const taskReducer = createReducer(
    initialState,
    on
)(Actions.addTask, (state,
    { task }) => ({
        ...state,
        tasks: 
    })
)
