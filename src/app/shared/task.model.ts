import { State } from "./task-state.model"
import { Comment } from "./comment.model"

export class Task {
    constructor(
        public _id: string,
        public board_id: string,
        public name: string,
        public description: string,
        public state: State,
        public created_date: string,
        public comments: Comment[]) {}
}