import { OnInit, Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { PokemonService } from "../../services/pokemon.service";
import { Pokemon, PokemonListRes } from "../../interfaces/pokemon.interface";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css'],
    imports: [CommonModule],
    standalone: true
})
export class PokemonListComponent implements OnInit{
    data: PokemonListRes | null = null
    errorMessage: any | null = null

    loading: boolean = false

    private readonly baseUrl: string = "https://pokeapi.co/api/v2/pokemon/"
    private readonly limit: number = 40
    offset: number = 0

    constructor(private pokemonService: PokemonService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const offsetParam = parseInt(params['offset'], 10)
            if (!isNaN(offsetParam)) this.offset = offsetParam
            this.loadPokemons()
        })
    }
    loadPokemons(){
        this.loading = true
        const url = this.buildUrl(this.offset)
        this.pokemonService.getPokemons(url).subscribe({
            next: (res) => {
                this.data = res
                this.errorMessage = null
            },
            error: (err) => this.errorMessage = "Failed to load Pokémon data. Please try again later.",
            complete: () => {
                // console.log(this.data)
                this.loading = false
            }
            
        })
    }
    next(): void {
        this.offset += this.limit
        this.updateUrlAndLoad()
    }

    prev(): void {
        if (this.offset > 0){
            this.offset -= 40
            this.updateUrlAndLoad()
        }
    }

    goToPokemonDetails(pokemonId: string): void{
        this.router.navigate(['/pokemon/', pokemonId])
    }

    private updateUrlAndLoad(): void {
        this.router.navigate(["/pokemon"], { queryParams: { offset: this.offset } })
        this.loadPokemons()
    }

    private buildUrl(offset: number): string {
        return `${this.baseUrl}?offset=${offset}&limit=${this.limit}`
    }
}