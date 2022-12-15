import { State } from "./task-state.model"
import { Comment } from "./comment.model"

export interface Task {
    _id: string,
    board_id: string,
    name: string,
    description: string,
    state: State,
    created_date: string,
    comments: Comment[]
}