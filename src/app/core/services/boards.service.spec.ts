import { Board } from "src/app/shared/models/board.model";
import { BoardsService } from "./boards.service";
import {boardsURL} from '../../shared/utils/URLs';
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";

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

    it('should test #fetchBoards', () => {
        const response = [
            new Board('Board', '2022-02-02', 'desc', '00098765443', '998876540'),
            new Board('Board 2', '2022-02-02', 'desc', '00098765443', '998876540'),
            new Board('Board 3', '2022-02-02', 'desc', '00098765443', '998876540')
        ]
        const url = boardsURL;

        // let spy = spyOn(httpClientSpy, 'get').m
    })
})