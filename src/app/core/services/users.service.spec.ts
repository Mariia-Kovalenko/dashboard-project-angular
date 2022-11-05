import { UsersService } from "./users.service";
import { LocalStorageService } from "./local-storage.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import {userResponseMock} from '../../mocks/user-mock';
import {boardsURL, usersURL} from '../../shared/utils/URLs';
import { boardsMock } from "src/app/mocks/boards-mock";

describe('User service', () => {
    let service: UsersService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                UsersService,
                HttpClient,
                LocalStorageService
            ]
        });

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(UsersService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#getUserInfo', () => {
        it('should return profile info for current user', () => {
            service.getUserInfo().subscribe({
                next: data => expect(data).toBeTruthy(),
                error: fail
            });

            const req = httpTestingController.expectOne(usersURL + 'me');
            expect(req.request.method).toEqual('GET');
        })
    })

    describe('#getUserBoards', () => {
        it('should return list of boards created by current user', () => {
            service.getUserBoards().subscribe({
                next: data => expect(data).toEqual([boardsMock[0], boardsMock[1]]),
                error: fail
            });

            const req = httpTestingController.expectOne(boardsURL + '/my_boards');
            expect(req.request.method).toEqual('GET');
            req.flush([boardsMock[0], boardsMock[1]]);
        })
    })
})