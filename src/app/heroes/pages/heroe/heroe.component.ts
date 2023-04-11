import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  constructor(
    private activateRoute: ActivatedRoute,
    private heroeServices: HeroesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.heroeServices.getHeroePorId(id)))
      .subscribe((data) => (this.heroe = data));
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}
