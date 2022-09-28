import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./core/components/dashboard/dashboard.component";
import { BoardDetailsComponent } from "./core/components/board-details/board-details.component";


const appRoutes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {path: 'dashboard/:id', component: BoardDetailsComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}