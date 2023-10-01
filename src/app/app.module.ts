import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmeListagemComponent } from './components/filmes/filme-listagem/filme-listagem.component';
import { FilmeDetalhesComponent } from './components/filmes/filme-detalhes/filme-detalhes.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilmeService } from './services/filme.service';
import { PosterFilmeComponent } from './components/filmes/poster-filme/poster-filme.component';
import { HttpClientModule } from "@angular/common/http"
import { ToastrModule } from 'ngx-toastr';
import { ListaFilmesComponent } from './shared/lista-filmes/lista-filmes.component';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmeListagemComponent,
    FilmeDetalhesComponent,
    NavbarComponent,
    PosterFilmeComponent,
    ListaFilmesComponent,
    CardFilmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true
    }),
    HttpClientModule
  ],
  providers: [FilmeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
