import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DetalhesFilme } from 'src/app/models/detalhes-filme';
import { Filme } from 'src/app/models/filme';
import { FilmeService } from 'src/app/services/filme.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-filme-detalhes',
  templateUrl: './filme-detalhes.component.html',
  styleUrls: ['./filme-detalhes.component.css']
})
export class FilmeDetalhesComponent implements OnInit {
filme: DetalhesFilme | undefined
urlSeguroTrailer: any;
favorito: boolean = false;

  constructor(
    private filmeService: FilmeService,
    private LocalStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    if (!id) return;

    this.filmeService
    .selecionarDetalhesFilme(id)
    .subscribe((resposta) => {
      this.filme = resposta;
      this.urlSeguroTrailer = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.filme.trailers[0].sourceUrl
        )

      this.carregarStatusFavorito();
    });

   
  }

  favoritar() {
    

    if (this.favorito) {
      this.LocalStorageService.desfavoritar(this.filme!.id);

      this.toastrService.success(
      'Filme removido dos favoritos com sucesso!',
      'Sucesso');

      return;
    }

    const filmeParaFavoritar = new Filme(
      this.filme!.id, 
      this.filme!.titulo, 
      this.filme!.imagem
      );
    

    this.LocalStorageService.favoritar(filmeParaFavoritar);

    this.toastrService.success(
    'Filme adicionado aos favoritos com sucesso!',
    'Sucesso');
  }

  private carregarStatusFavorito(){
    const favoritoEncontrado = this.LocalStorageService.selecionarPorId(
      this.filme!.id
      );

      if (favoritoEncontrado) {
        this.favorito = true;
      }
      else{
        this.favorito = false;
      }
  }
}
