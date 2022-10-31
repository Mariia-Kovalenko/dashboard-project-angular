import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./features/auth/auth/auth.component";


const appRoutes: Routes = [
    {path: '', redirectTo: 'auth', pathMatch: 'full'},
    // {
    //     path: 'profile',
    //     component: ProfileComponent,
    //     canActivate: [AuthGuard],
    //     canActivateChild: [AuthGuard],
    //     children: [
    //         {
    //             path: 'info',
    //             component: UserProfileComponent
    //         },
    //         {
    //             path: 'user-boards',
    //             component: UserBoardsComponent
    //         },
    //         {
    //             path: 'edit/:id',
    //             component: EditProfileComponent
    //         },
    //     ]
    // },
    // {
    //         path: 'dashboard/:id', 
    //         component: BoardDetailsComponent,
    //         canActivate: [AuthGuard],
    // },
    // {path: 'auth',  component: AuthComponent},
    // {path: 'archive',  component: ArchivedTasksComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}