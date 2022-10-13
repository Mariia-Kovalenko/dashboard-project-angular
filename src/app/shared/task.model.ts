import { State } from "./task-state.model"

export class Task {
    constructor(
        public _id: string,
        public board_id: string,
        public name: string,
        public state: State,
        public comments: string[]) {}
}