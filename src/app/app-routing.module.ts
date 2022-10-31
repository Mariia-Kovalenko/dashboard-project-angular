import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";


const appRoutes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(x => x.AuthModule)},
    {path: 'profile', loadChildren: () => import('./features/profile/profile.module').then(x => x.ProfileModule)},
    {path: 'dashboard', loadChildren: () => import('./features/board/board.module').then(x => x.BoardModule)}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}