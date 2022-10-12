import { Task } from "./task.model";

export class Board {
    constructor(
        public name: string,
        public created_date: string,
        public description: string,
        public _id: string,
        public created_by?: string,
        public tasks?: Task[]) {}
}
// export class Board {
//     constructor(public name: string,
//         public creationDate: string,
//         public description: string,
//         public tasks: Task[]) {}
// }