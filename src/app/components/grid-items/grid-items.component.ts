import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { PokemonDTO } from 'src/app/models/pokemon.interface';
import { PokemonListDTO } from 'src/app/models/pokemonList.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-grid-items',
  templateUrl: './grid-items.component.html',
  styleUrls: ['./grid-items.component.css'],
  animations: [
    trigger('cardFlip', [
      state('hide', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hide => show', [
        animate('800ms')
      ])
    ])
  ]
})
export class GridItemsComponent {

  @Input() offset!: string;
  @Input() view!: string;

  pokemonInfo!: PokemonListDTO;
  pokemonList!: PokemonDTO[];
  loading!: boolean;
  state!: string;
  // offset!: string;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {

    let url: string = '';

    if(this.offset){
      url = "https://pokeapi.co/api/v2/pokemon?offset=" + this.offset + "&limit=20";
    }
    else{
      this.offset = '0';
    }
    
    this.loadPokemonList(url);
  }

  loadPokemonList(url: string): void{
    this.loading = true;
    this.offset = (url != '' && url) ? url.split('offset=')[1].split('&')[0] : this.offset;

    this.pokemonService.getAllPokemon(url).subscribe((pokeList) => {
      console.log(pokeList);
      this.pokemonInfo = pokeList;
      this.pokemonList = pokeList.results;

      for (let index = 0; index < this.pokemonList.length; index++) {
          this.pokemonList[index].state = "hide";
      }

      setTimeout(() => {
        this.loading = false;
        this.cardShow("show");
      }, 500);
    });
  }

  cardShow(state: string) {
    let index = 0;
    this.state = "show";
    let postShowInterval = setInterval(() => {
      this.pokemonList[index].state = state;
      index++;

      if (index == this.pokemonList.length) {
        clearInterval(postShowInterval);
      }
    }, 100)
  }
}
