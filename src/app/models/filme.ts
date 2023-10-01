export class Filme {
  id : number;
  titulo : string;
  imagem : any;


  constructor(
    id : number,
  titulo : string,
  imagem : any
  ) {
  this.id = id;
  this.titulo = titulo;
  this.imagem = "https://image.tmdb.org/t/p/original/" + imagem;
  }
}
