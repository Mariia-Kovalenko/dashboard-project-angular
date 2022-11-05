import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { TasksService } from "./tasks.service";
import { tasksURL } from "src/app/shared/utils/URLs";
import { tasksMock } from "src/app/mocks/tasks-mock";

describe('Tasks Service', () => {
    let service: TasksService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                TasksService,
                HttpClient
            ]
        });

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(TasksService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#fetchTasksForBoard', () => {
        const boardId = '123';

        it('should return tasks for board with id 123', () => {
            service.fetchTasksForBoard(boardId).subscribe({
                next: tasks => expect(tasks).toEqual([tasksMock[0], tasksMock[1]]),
                error: fail
            });

            const req = httpTestingController.expectOne(tasksURL + boardId);
            expect(req.request.method).toEqual('GET');
            req.flush([tasksMock[0], tasksMock[1]]);
        })
    })

    describe('#getTasksByName', () => {
        const boardId = '123';
        const taskName = 'Task';
        const emptyTaskName = '';

        it('should return tasks with name starting with "Task"', () => {
            service.getTasksByName(boardId, taskName).subscribe({
                next: tasks => expect(tasks).toEqual([tasksMock[0], tasksMock[1], tasksMock[2]]),
                error: fail
            });

            const req = httpTestingController.expectOne(tasksURL + boardId + `/${taskName}` + '/find_tasks');
            expect(req.request.method).toEqual('GET');
            req.flush([tasksMock[0], tasksMock[1], tasksMock[2]]);
        })
        
        it('should return all tasks if name is empty', () => {
            service.getTasksByName(boardId, emptyTaskName).subscribe({
                next: tasks => expect(tasks).toEqual(tasksMock),
                error: fail
            });

            const req = httpTestingController.expectOne(tasksURL + boardId);
            expect(req.request.method).toEqual('GET');
            req.flush(tasksMock);
        })
    });

    describe('#getTaskById', () => {
        const taskId = '1';

        it('should return task with id "1"', () => {
            service.getTaskById(taskId).subscribe({
                next: task => expect(task).toEqual(tasksMock[0]),
                error: fail
            });
    
            const req = httpTestingController.expectOne(`${tasksURL}${taskId}/task`);
            expect(req.request.method).toEqual('GET');
            req.flush(tasksMock[0]);
        })
    })

    describe('#deleteTask', () => {
        const response = {'message': 'Task deleted successfully'};
        const taskToDelete = tasksMock[0];

        it('should delete task with id "1"', () => {
            service.deleteTask(taskToDelete.board_id, taskToDelete._id).subscribe({
                next: res => expect(res).toEqual(response),
                error: fail
            });
    
            const req = httpTestingController.expectOne(`${tasksURL}${taskToDelete.board_id}/${taskToDelete._id}`);
            expect(req.request.method).toEqual('DELETE');
            req.flush(response);
        })
    })

    describe('#commentTask', () => {
        const taskId = '1';
        const commentMessage = 'Some text';
        const response = {'message': 'Task commented'};
        const request = { message: commentMessage}

        it('should add comment to task', () => {
            service.commentTask(taskId, commentMessage).subscribe({
                next: res => expect(res).toEqual(response),
                error: fail
            })
            const req = httpTestingController.expectOne(`${tasksURL}${taskId}/comment`);
            expect(req.request.method).toEqual('PATCH');
            expect(req.request.body).toEqual(request);

            // const response = new HttpResponse({ status: 200, statusText: 'OK', body: { success: true } });
            // req.event(response);
        })
    })
})