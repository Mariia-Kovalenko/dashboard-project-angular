import { BoardComponent } from "./board.component";
import { BoardsService } from "src/app/core/services/boards.service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {ShortenPipe} from '../../../shared/pipes/shorten.pipe';
import {boardsMock} from '../../../mocks/boards-mock';
import { TasksService } from "src/app/core/services/tasks.service";

describe('Board Component', () => {
    let component: BoardComponent;
    let fixture: ComponentFixture<BoardComponent>;
    let tasksService: TasksService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                BoardComponent,
                ShortenPipe
            ],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                TasksService
            ]
        })
        .compileComponents();
    
        fixture = TestBed.createComponent(BoardComponent);
        tasksService = TestBed.inject(TasksService);
        component = fixture.componentInstance;
        component.board = boardsMock[0];
        fixture.detectChanges();
    });

    it('should emit #openFormModal event on button click', () => {
        const spy = spyOn(component.openFormModal, 'emit');
        fixture.detectChanges();
        
        const button = fixture.debugElement.nativeElement.querySelector('#openForm');
        button.click();

        fixture.detectChanges()
        expect(spy).toHaveBeenCalled();
    });


    it('should emit #deleteBoard event on button click', () => {
        const spy = spyOn(component.deleteBoard, 'emit');
        fixture.detectChanges();
        
        const button = fixture.debugElement.nativeElement.querySelector('#deleteBoard');
        button.click();

        fixture.detectChanges()
        expect(spy).toHaveBeenCalled();
    })
})