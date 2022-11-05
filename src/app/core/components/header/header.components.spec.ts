import { HeaderComponent } from "./header.component";
import { AuthService } from "../../services/auth.service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";


describe('Header Component', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let authService: AuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                AuthService
            ]
        })
        .compileComponents();
    
        fixture = TestBed.createComponent(HeaderComponent);
        authService = TestBed.inject(AuthService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should logout user', () => {
        component.isAuthenticated = true;
        const spy = spyOn(authService, 'logout').and.callThrough();
        fixture.detectChanges();
        
        const button = fixture.debugElement.nativeElement.querySelector('#logout');
        button.click();

        fixture.detectChanges()
        expect(spy).toHaveBeenCalled();
    })
})