export class Comment {
    constructor(
        public _id: string,
        public message: string,
        public user_id: string,
        public user_name: string,
        public time: string
    ){}
}