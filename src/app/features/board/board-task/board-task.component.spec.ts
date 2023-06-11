import { BoardTaskComponent } from "./board-task.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { tasksMock } from "src/app/mocks/tasks-mock";
import { TasksService } from "src/app/core/services/tasks.service";
import { State } from "src/app/shared/models/task-state.model";


describe('Board Task Component', () => {
    let component: BoardTaskComponent;
    let fixture: ComponentFixture<BoardTaskComponent>;
    let tasksService: TasksService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                BoardTaskComponent,
            ],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                TasksService
            ]
        })
        .compileComponents();
    
        fixture = TestBed.createComponent(BoardTaskComponent);
        tasksService = TestBed.inject(TasksService);
        component = fixture.componentInstance;
        component.task = tasksMock[0];
        fixture.detectChanges();
    });

    it('should emit #editTask event', () => {
        const spy = spyOn(component.onEditTask, 'emit');
        fixture.detectChanges();

        const button = fixture.debugElement.nativeElement.querySelector('#edit-task');
        button.click();

        fixture.detectChanges()
        expect(spy).toHaveBeenCalled();
    });


    it('should emit #deleteTask event', () => {
        const spy = spyOn(component.deleteTask, 'emit');
        fixture.detectChanges();

        const button = fixture.debugElement.nativeElement.querySelector('#delete-task');
        button.click();

        fixture.detectChanges()
        expect(spy).toHaveBeenCalled();
    });


    it('should not show archive task btn for tasks that have status other than done', () => {
        component.task = tasksMock[1];
        fixture.detectChanges();

        const button = fixture.debugElement.nativeElement.querySelector('#archive-task');
        expect(button).toBeFalsy();
    })
})