import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmeListagemComponent } from './components/filmes/filme-listagem/filme-listagem.component';
import { FilmeDetalhesComponent } from './components/filmes/filme-detalhes/filme-detalhes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'filme/listagem',
    pathMatch: 'full',
  },
  {
    path: 'filme/listagem',
    component: FilmeListagemComponent
  },
  {
    path: 'filme/detalhes/:id',
    component: FilmeDetalhesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
