import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Pokemon,PokemonDetails , PokemonListRes, Ability, Move, Type, Stat } from '../interfaces/pokemon.interface';
import { Pokemon, PokemonListRes, PokemonDetails } from '../interfaces/pokemon.interface';



@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private POKEMON_DETAILS_URL = "https://pokeapi.co/api/v2/pokemon/"

    constructor(private http: HttpClient) { }

    getPokemons(url: string) : Observable<PokemonListRes>{
        return this.http.get<PokemonListRes>(url).pipe(
            retry(3),
            map((res) => ({
                ...res, 
                results: res.results.map(pokemon => ({
                    url: pokemon.url,
                    name: pokemon.name, 
                    id: this.getId(pokemon.url)
                }))
            })),
            catchError(this.handleError)
        )
    }

    getPokemonDetails(pokemonId:string): Observable<PokemonDetails>{
        return this.http.get<PokemonDetails>(this.POKEMON_DETAILS_URL + pokemonId).pipe(
            retry(3),
            catchError(this.handleError)
        )
    }
    

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!'
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`
        } else {
            errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`
        }
        return throwError(() => new Error(errorMessage))
    }

    private getId(url: string) : string{
        const idMatch = url.match(/\/(\d+)\//)
        return idMatch ? idMatch[1] : '0'
    }

}