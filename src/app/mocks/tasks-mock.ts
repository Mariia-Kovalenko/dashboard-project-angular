import { Task } from "../shared/models/task.model";
import { State } from "../shared/models/task-state.model";
import { Comment } from "../shared/models/comment.model";

export const tasksMock: Task[] = [
    new Task('1', '123', 'Task1', 'description', State.DONE, '2022-10-20T07:20:56.291+00:00', [
        new Comment('0001', 'comment message', 'user889', 'Tomas', '2022-10-08T17:22:03.577+00:00'),
        new Comment('0002', 'comment message from Sarah', 'user123', 'Sarah', '2022-10-29T13:57:22.150+00:00')
    ]),
    new Task('2', '123', 'Task2', 'description', State.TODO, '2022-10-20T07:21:19.804+00:00', []),
    new Task('3', '456', 'Task3', 'description', State.IN_PROGRESS, '2022-10-20T07:21:19.804+00:00', [
        new Comment('0002', 'comment message from Sarah', 'user123', 'Sarah', '2022-11-29T13:57:22.150+00:00')
    ]),
    new Task('4', '789', 'MTR-56', 'description', State.DONE, '2022-10-25T19:17:59.527+00:00', [])
]