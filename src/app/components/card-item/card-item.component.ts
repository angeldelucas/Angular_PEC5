import { Component, Input } from '@angular/core';
import { PokemonDTO } from 'src/app/models/pokemon.interface';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {

  @Input() pokemon!: PokemonDTO;
  @Input() offset!: string;
  @Input() view!: string;

  pokemonIdNumber: string = '';
  pokemonImgURL: string = '';

  constructor() {}

  ngOnInit(): void {

    this.pokemonIdNumber = this.pokemon.url.split('/')[this.pokemon.url.split('/').length - 2];
    this.pokemonImgURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' + this.pokemonIdNumber + '.png';
  }
}
