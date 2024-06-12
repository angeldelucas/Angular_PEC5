import { PokemonDTO } from "./pokemon.interface";

export interface PokemonListDTO {
    count: number;
    next: string;
    previous: string;
    results: PokemonDTO[];
}
