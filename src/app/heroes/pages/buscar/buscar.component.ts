import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
})
export class BuscarComponent implements OnInit {
  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activateRoute.params.subscribe(({ id }) => console.log(id));
  }
}
