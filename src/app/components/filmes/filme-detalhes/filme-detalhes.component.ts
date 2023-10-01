import { Component, OnInit } from '@angular/core';
import { DetalhesFilme } from 'src/app/models/detalhes-filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-filme-detalhes',
  templateUrl: './filme-detalhes.component.html',
  styleUrls: ['./filme-detalhes.component.css']
})
export class FilmeDetalhesComponent implements OnInit {
filme: DetalhesFilme | undefined

  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    this.filmeService
    .selecionarDetalhesFilme(5)
    .subscribe((resposta) => {this.filme = resposta});
  }
}
