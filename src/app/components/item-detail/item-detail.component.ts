import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {

  constructor(private pokemonService: PokemonService, private activatedRoute: ActivatedRoute) { }
  
  pokemon!: any;
  pokemonTypes: string = '';
  offset: any = '';
  view: any = '';


  ngOnInit(): void {
    const pokemonId = this.activatedRoute.snapshot.paramMap.get('id');
    this.offset = this.activatedRoute.snapshot.paramMap.get('offset');
    this.view = this.activatedRoute.snapshot.paramMap.get('view');

    this.pokemonService.getPokemon(pokemonId!).subscribe((pokemon) => {
      console.log(pokemon);
      this.pokemon = pokemon;

      this.pokemon.types.forEach((type: any, index: any, array: any) => {
        this.pokemonTypes += type.type.name;

        if(array.length != 0 && index != array.length - 1){
          this.pokemonTypes  = this.pokemonTypes + '/';
        }
      });
    });
  }
}
