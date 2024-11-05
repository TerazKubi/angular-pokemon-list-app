import { OnInit, Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { PokemonService } from "../../services/pokemon.service";
import { PokemonDetails } from "../../interfaces/pokemon.interface";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.css'],
    imports: [CommonModule],
    standalone: true
})
export class PokemonDetailsComponent implements OnInit{
    pokemonId: string | null = null
    pokemon!: PokemonDetails
    errorMessage: string | null = null
    loading: boolean = true

    pokemonTotalStats: number = 0
    

    pokemonTypeColors: { [key: string]: string } = {
        normal: "#A8A878",
        fighting: "#C03028",
        flying: "#A890F0",
        poison: "#A040A0",
        ground: "#E0C068",
        rock: "#B8A038",
        bug: "#A8B820",
        ghost: "#705898",
        steel: "#B8B8D0",
        fire: "#F08030",
        water: "#6890F0",
        grass: "#78C850",
        electric: "#F8D030",
        psychic: "#F85888",
        ice: "#98D8D8",
        dragon: "#7038F8",
        dark: "#705848",
        fairy: "#EE99AC",
        stellar: "#FFD700",
        unknown: "#68A090",
        shadow: "#493963"
    }

    constructor(private pokemonService: PokemonService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.pokemonId = this.route.snapshot.paramMap.get('pokemonId')
        if (this.pokemonId) {
            this.fetchPokemonDetails(this.pokemonId)
        } else {
            this.errorMessage = "Invalid Pokémon ID."
            this.loading = false
        }
    }

    private fetchPokemonDetails(id: string) {
        this.loading = true
        this.pokemonService.getPokemonDetails(id).subscribe(response => {
            if (response) {
                this.pokemon = response
                this.pokemonTotalStats = this.pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)
            }
            this.loading = false
        })
    }
    
}