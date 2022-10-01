import { State } from "./task-state.model"

export class Task {
    constructor(public id: string,
        public name: string,
        public state: State,
        public comments: string[]) {}
}