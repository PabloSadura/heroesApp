import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    first_appearance: '',
    characters: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroeService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroePorId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this.heroeService
        .actualizarHeroe(this.heroe)
        .subscribe((heroe) =>
          this.mostrarSnackBar(`Se actualizo correctamente `)
        );
    } else {
      this.heroeService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar('Registro creado correctamente');
      });
    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe,
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.heroeService.borrarHeroe(this.heroe.id!).subscribe((resp) => {
          this.router.navigate(['/heroes']);
          this.mostrarSnackBar('Se borro correctamente');
        });
      }
    });
  }

  mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'ok!', { duration: 2000 });
  }
}
