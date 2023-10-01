import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Filme } from "../models/filme";
import { DetalhesFilme } from "../models/detalhes-filme";
import { TrailerFilme } from "../models/trailer-filme";
import { CreditosFilme } from "../models/creditos-filme";

@Injectable({
  providedIn: 'root'
})

export class FilmeService
{
  private API = "https://api.themoviedb.org/3/movie/"
  constructor(private http: HttpClient) {}

  criar(filme: any){
    return this.http.post<any> (this.API, filme, this.obterHeadersAutorizacao() )
  }

  public selecionarDetalhesFilme(id: number): Observable<DetalhesFilme> {
    const url = `${this.API}${id}?append_to_response=videos,credits`

    return this.http.get<any>(url, this.obterHeadersAutorizacao())
    .pipe(
map(obj => this.mapearDetalhesFilme(obj)));
  }

 public selecionarFilmesPopulares(paginaAlterada: number): Observable<Filme[]> {
  const url = this.API + 'popular' + '?page=' + paginaAlterada;
    return this.http.get<any>(url, this.obterHeadersAutorizacao())
    .pipe(
      map((res) => res.results),
      map((objetos) => this.mapearFilmes(objetos))
      );
  }

  public selecionarFilmesBemAvaliados(paginaAlterada: number): Observable<Filme[]> {
    const url = this.API + 'top_rated' + '?page=' + paginaAlterada;

      return this.http.get<any>(url, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.results),
        map((objetos) => this.mapearFilmes(objetos))
        );
    }

  private mapearFilmes(objetos: any[]): Filme[] {
    return objetos.map((obj: any): Filme => {
      return new Filme(obj.id, obj.title, obj.poster_path);
    });
  }

  private mapearDetalhesFilme(obj: any): DetalhesFilme{
    return new DetalhesFilme(
    obj.id,
    obj.title,
    obj.poster_path,
    obj.vote_average,
    obj.vote_count,
    obj.release_date,
    obj.overview,
    obj.genres,
    this.mapearTrailersFilme(obj.videos.results),
    this.mapearCreditosFilme(obj.credits.crew.concat(obj.credits.cast))
    )
  }

  private mapearTrailersFilme(objetos: any[]): TrailerFilme[] {
    return objetos.map((obj) => {
      return new TrailerFilme(obj.id, obj.key);
    })
  }

  private mapearCreditosFilme(objetos: any[]): CreditosFilme[] {
    return objetos.map(obj => {
      return new CreditosFilme(
        obj.order,
        obj.name,
        obj.known_for_department,
        obj.profile_path,
        obj.character
      )
    })
  }

  private obterHeadersAutorizacao() {
    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: environment.API_KEY,
      },
    };
  }

}

export class ResultadoFilmes {
  results: Filme[];

  constructor(results: Filme[]){this.results = results}
}
