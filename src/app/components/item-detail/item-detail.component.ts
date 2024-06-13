import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ability, HeldItem, Move, PokemonDetail } from 'src/app/models/pokemonDetailsDTO.interface';

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
  pokemonAbilities: string[] = [];
  pokemonItems: string[] = [];
  pokemonMoves: string[] = [];
  offset: any = '';
  view: any = '';
  pokemonImgUrl: string[] = [];
  pokemonImgUrlShowed: string = '';
  pokemonImgKeys: string[] = [];
  pokemonImgKey: string = '';
  index: number = 0;


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

        if (array.length != 0 && index != array.length - 1) {
          this.pokemonTypes = this.pokemonTypes + '/';
        }
      });

      //pokemon abiliies
      this.pokemon.abilities.forEach((ability: Ability, index: number, array: Ability[]) => {
        this.pokemonAbilities.push(ability.ability.name);
      });

      //pokemon held items
      this.pokemon.held_items.forEach((item: HeldItem, index: number, array: HeldItem[]) => {
        this.pokemonItems.push(item.item.name);
      });

      //pokemon moves
      this.pokemon.moves.forEach((move: Move, index: number, array: Move[]) => {
        this.pokemonMoves.push(move.move.name);
      });

      //pokemon images
      this.pokemonMoves.splice(5, this.pokemonMoves.length);
      this.pokemonImgUrl = Object.values(pokemon.sprites);
      this.pokemonImgKeys = Object.keys(pokemon.sprites);
      this.pokemonImgUrlShowed = this.pokemonImgUrl[this.index];
      this.pokemonImgKey = this.pokemonImgKeys[this.index].replace('_', ' ');
    });
  }

  showHideDetails(): void {
    this.showDetails = !this.showDetails;
  }

  changeImgRight() {
    this.index = this.index++ <= 6 ? this.index++ : 0;

    while (this.pokemonImgUrl[this.index] == undefined) {
      this.index = this.index++ <= 6 ? this.index++ : 0;
    }
    this.pokemonImgUrlShowed = this.pokemonImgUrl[this.index];
    this.pokemonImgKey = this.pokemonImgKeys[this.index].replace('_', ' ');
  }

  changeImgLeft() {
    this.index = this.index-- >= 0 ? this.index-- : 7;
    
    while (this.pokemonImgUrl[this.index] == undefined) {
      this.index = this.index-- >= 0 ? this.index-- : 7;
    }
    this.pokemonImgUrlShowed = this.pokemonImgUrl[this.index];
    this.pokemonImgKey = this.pokemonImgKeys[this.index].replace('_', ' ');
  }
}
