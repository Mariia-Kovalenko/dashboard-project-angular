import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./core/components/dashboard/dashboard.component";
import { BoardDetailsComponent } from "./core/components/board-details/board-details.component";
import { AuthComponent } from "./core/components/auth/auth.component";
import { AuthGuard } from "./core/components/auth/auth.guard";
import { ProfileComponent } from "./core/components/profile/profile.component";
import { EditProfileComponent } from "./core/components/profile/profile-tabs/edit-profile/edit-profile.component";
import { UserProfileComponent } from "./core/components/profile/profile-tabs/user-profile/user-profile.component";
import { UserBoardsComponent } from "./core/components/profile/profile-tabs/user-boards/user-boards.component";
import { ArchivedTasksComponent } from "./core/components/archived-tasks/archived-tasks.component";


const appRoutes: Routes = [
    {path: '', redirectTo: 'auth', pathMatch: 'full'},
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'info',
                component: UserProfileComponent
            },
            {
                path: 'user-boards',
                component: UserBoardsComponent
            },
            {
                path: 'edit/:id',
                component: EditProfileComponent
            },
        ]
    },
    {
            path: 'dashboard/:id', 
            component: BoardDetailsComponent,
            canActivate: [AuthGuard],
    },
    {path: 'auth',  component: AuthComponent},
    {path: 'archive',  component: ArchivedTasksComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}