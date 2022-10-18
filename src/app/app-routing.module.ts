import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./core/components/dashboard/dashboard.component";
import { BoardDetailsComponent } from "./core/components/board-details/board-details.component";
import { AuthComponent } from "./core/components/auth/auth.component";
import { AuthGuard } from "./core/components/auth/auth.guard";


const appRoutes: Routes = [
    {path: '', redirectTo: 'auth', pathMatch: 'full'},
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
            path: 'dashboard/:id', 
            component: BoardDetailsComponent,
    },
    {path: 'auth',  component: AuthComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}