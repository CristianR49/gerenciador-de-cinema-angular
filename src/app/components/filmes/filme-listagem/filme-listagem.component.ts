import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/models/filme';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-filme-listagem',
  templateUrl: './filme-listagem.component.html',
  styleUrls: ['./filme-listagem.component.css'],
})
export class FilmeListagemComponent implements OnInit {
  filmesFavoritos: Filme[] = [];

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.filmesFavoritos = this.localStorage.carregarFavoritos();
  }
}