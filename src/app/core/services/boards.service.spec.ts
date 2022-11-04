import { Board } from "src/app/shared/models/board.model";
import { BoardsService } from "./boards.service";
import { boardsMock } from "src/app/mocks/boards-mock";
import {boardsURL} from '../../shared/utils/URLs';
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient, HttpResponse } from "@angular/common/http";

describe('Boards Service', () => {
    let service: BoardsService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                BoardsService,
                HttpClient
            ]
        });

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(BoardsService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#fetchBoards',() => {
        const url = boardsURL;

        it('should return boards', () => {
            service.fetchBoards().subscribe({
                next: boards => expect(boards).toEqual(boardsMock),
                error: fail
            })
            const req = httpTestingController.expectOne(url);
            expect(req.request.method).toEqual('GET');
            req.flush(boardsMock);
        })
    });

    describe('#fetchBoardById',() => {
        const url = boardsURL;

        it('should return board', () => {
            service.fetchBoardById('1').subscribe({
                next: board => 
                expect(board).toEqual(boardsMock[0]),
                error: fail
            })
            const req = httpTestingController.expectOne(url + '1');
            expect(req.request.method).toEqual('GET');
            req.flush(boardsMock[0]);
        })
    });

    describe('#findBoardsByName',() => {
        const url = boardsURL;

        it('should return board', () => {
            const boardName = 'Board 2'
            service.findBoardsByName(boardName).subscribe({
                next: board => 
                expect(board).toEqual([boardsMock[1]]),
                error: fail
            })
            const req = httpTestingController.expectOne(url + `/${boardName}` + '/find_boards');
            expect(req.request.method).toEqual('GET');
            req.flush([boardsMock[1]]);
        })
    });

    describe('#updateBoard', () => {
        const id = '1';
        const url = boardsURL;

        beforeEach(() => {
            service = TestBed.inject(BoardsService);
        });

        it('should update board name', () => {
            const newName = 'Updated Board';
            const request = { name: newName }

            service.updateBoard(id, newName).subscribe({
                next: data => expect(data).toBeTruthy(),
                error: fail
            })

            const req = httpTestingController.expectOne(url + id);
            expect(req.request.method).toEqual('PUT');
            expect(req.request.body).toEqual(request);

            // Expect server to return success after PATCH
            const response = new HttpResponse({ status: 200, statusText: 'OK', body: { success: true } });
            req.event(response);
        })
    })


    // add test with spies
})