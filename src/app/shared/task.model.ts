import { State } from "./task-state.model"

export class Task {
    constructor(public name: string,
        public state: State) {}
}