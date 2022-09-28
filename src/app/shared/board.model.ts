import { Task } from "./task.model";

export class Board {
    constructor(public name: string,
        public creationDate: string,
        public description: string,
        public tasks: Task[]) {}
}