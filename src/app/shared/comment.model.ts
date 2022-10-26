export class Comment {
    constructor(
        public _id: string,
        public message: string,
        public user_id: string,
        public created_date: string
    ){}
}