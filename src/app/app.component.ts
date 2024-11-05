import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PokemonListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokemon-app';
}
