import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../../services/filme.service';
import { Filme } from 'src/app/models/filme';

@Component({
  selector: 'app-filme-listagem',
  templateUrl: './filme-listagem.component.html',
  styleUrls: ['./filme-listagem.component.css'],
})
export class FilmeListagemComponent {
  filme: Filme;
  filmesPopulares: Filme[] = [];
  filmesBemAvaliados: Filme[] = [];

  constructor(private filmeService: FilmeService) {
    this.filme = new Filme(0, '', '');
    //this.criarPoster();
  }
  

  criarPoster() {
    this.filmeService.criar(this.filme).subscribe((filme) => {
      console.log('filme: ' + filme.results[0].title);
    });
  }

  // aposAPromise(filmes: Filme[]): void {
  //   this.filmes = filmes;
}

/*import { Component, OnInit } from '@angular/core';
import { Nota } from '../nota';
import { NotaService } from '../nota.service';

@Component({
  selector: 'app-listar-notas',
  templateUrl: './listar-notas.component.html',
  styleUrls: ['./listar-notas.component.css'],
})
export class ListarNotasComponent implements OnInit {
  notas: Nota[] = [];

  constructor(private notaService: NotaService) {}

  ngOnInit(): void {
    this.notaService.selecionarTodos().subscribe((notas: Nota[]) => {
      this.notas = notas;
    });
  }
}
*/
