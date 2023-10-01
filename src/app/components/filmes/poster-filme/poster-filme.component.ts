import { Component, Input } from '@angular/core';
import { Filme } from '../../../models/filme';

@Component({
  selector: 'app-filme',
  templateUrl: './poster-filme.component.html',
  styleUrls: ['./poster-filme.component.css']
})

export class PosterFilmeComponent {
  @Input() filme : any;
}