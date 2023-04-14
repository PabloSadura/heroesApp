import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { HeroesService } from '../../services/heroes.service';

import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
})
export class BuscarComponent implements OnInit {
  constructor(private heroesServices: HeroesService) {}

  termino: string = '';

  heroes: Heroe[] = [];

  heroeSeleccionado: Heroe | undefined;

  ngOnInit() {}

  buscando() {
    this.heroesServices
      .getSugerencias(this.termino.trim())
      .subscribe((heroe) => (this.heroes = heroe));
  }
  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    } else {
      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;
      this.heroesServices
        .getHeroePorId(heroe.id!)
        .subscribe((data) => (this.heroeSeleccionado = data));
    }
  }
}
