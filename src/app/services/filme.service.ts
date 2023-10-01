import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Filme } from "../models/filme";
import { DetalhesFilme } from "../models/detalhes-filme";

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
    const url = `${this.API}${id}`

    return this.http.get<any>(url, this.obterHeadersAutorizacao())
    .pipe(
map(obj => this.mapearDetalhesFilme(obj)));
  }

 public selecionarFilmesPopulares(paginaAlterada: number): Observable<Filme[]> {
  const url = this.API + 'popular' + '?page=' + paginaAlterada;
  console.log(url);
    return this.http.get<any>(url, this.obterHeadersAutorizacao())
    .pipe(
      map((res) => res.results),
      map((objetos) => this.mapearFilmes(objetos))
      );
  }

  public selecionarFilmesBemAvaliados(paginaAlterada: number): Observable<Filme[]> {
    const url = this.API + 'top_rated' + '?page=' + paginaAlterada;
    console.log(url);
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
    [],
    []
    )
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

// obterFilmesApi() {
//   fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1', {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTAzMzM1YjlmMTAxYjQzODNhOWQ4ZjAxNmRiNGM1ZiIsInN1YiI6IjY0YWVlNjliNjZhMGQzMDBjNjcwZjdlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.maqe-EQttCKGgwuXNLSalnq-BseNByKVa64rRPW8EGI',
//     },
//   })
//     .then((res) => res.json())
//     .then((obj) => {
//       console.log('RESULTADO:');
//       console.log(obj);
//       //console.log(obj.results[0].overview);

      
//         this.aposAPromise(obj.results);
//     });
