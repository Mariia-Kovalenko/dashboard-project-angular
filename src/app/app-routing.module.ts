import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./core/components/dashboard/dashboard.component";
import { BoardDetailsComponent } from "./core/components/board-details/board-details.component";
import { AuthComponent } from "./core/components/auth/auth.component";


const appRoutes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {path: 'dashboard/:id', component: BoardDetailsComponent},
    {path: 'auth',  component: AuthComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}