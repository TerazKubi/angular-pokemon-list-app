import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/pokemon', pathMatch: 'full' },
    { path: 'pokemon', component: PokemonListComponent },
    { path: 'pokemon/:pokemonId', component: PokemonDetailsComponent }
];
