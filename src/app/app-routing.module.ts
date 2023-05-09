import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';

const routes: Routes = [
  { path: '', redirectTo: 'lista-produtos', pathMatch: 'full' },
  { path: 'lista-produtos', component: ListaProdutosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
