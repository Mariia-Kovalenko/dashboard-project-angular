import { Task } from "./task.model";

export interface Board {
    name: string,
    created_date: string,
    description: string,
    _id: string,
    created_by?: string
}