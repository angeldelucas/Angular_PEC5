import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonListDTO } from '../models/pokemonList.interface';
import { Observable } from 'rxjs';
// import { PokemonDTO } from '../models/pokemon.interface';
import { PokemonDetail } from '../models/pokemonDetailsDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getAllPokemon(url: string): Observable<PokemonListDTO> {

    if (url) {
      return this.http.get<PokemonListDTO>(url);
    }
    else {
      return this.http.get<PokemonListDTO>('https://pokeapi.co/api/v2/pokemon');
    }
  }
  
  getPokemon(id: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>('https://pokeapi.co/api/v2/pokemon/' + id);
  }
}
