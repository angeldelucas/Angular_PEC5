import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ability, HeldItem, PokemonDetail } from 'src/app/models/pokemonDetailsDTO.interface';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {
  
  constructor(private pokemonService: PokemonService, private activatedRoute: ActivatedRoute) { }
  
  showDetails: boolean = false;
  pokemon!: PokemonDetail;
  pokemonTypes: string = '';
  pokemonAbilities: string = '';
  pokemonItem: string = '';
  offset: any = '';
  view: any = '';


  ngOnInit(): void {
    const pokemonId = this.activatedRoute.snapshot.paramMap.get('id');
    this.offset = this.activatedRoute.snapshot.paramMap.get('offset');
    this.view = this.activatedRoute.snapshot.paramMap.get('view');

    this.pokemonService.getPokemon(pokemonId!).subscribe((pokemon) => {
      console.log(pokemon);
      this.pokemon = pokemon;

      // pokemon type
      this.pokemon.types.forEach((type: any, index: any, array: any) => {
        this.pokemonTypes += type.type.name;

        if(array.length != 0 && index != array.length - 1){
          this.pokemonTypes  = this.pokemonTypes + '/';
        }
      });

      //pokemon abiliies
      this.pokemon.abilities.forEach((ability: Ability, index: number, array: Ability[]) => {
        this.pokemonAbilities += ability.ability.name;

        if(array.length != 0 && index != array.length - 1){
          this.pokemonAbilities  = this.pokemonAbilities + '/';
        }
      });

      //pokemon held items
      this.pokemon.held_items.forEach((item: HeldItem, index: number, array: HeldItem[]) => {
        this.pokemonItem += item.item.name;

        if(array.length != 0 && index != array.length - 1){
          this.pokemonItem  = this.pokemonItem + '/';
        }
      });
    });
  }

  showHideDetails(): void {
    this.showDetails = !this.showDetails;
  }
}
