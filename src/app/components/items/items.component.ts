import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { PokemonDTO } from 'src/app/models/pokemon.interface';
// import { PokemonListDTO } from 'src/app/models/pokemonList.interface';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {

  gridSelected: boolean = true;
  tableSelected: boolean = false;
  offset: any;
  view: any = "grid";

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.offset = this.activatedRoute.snapshot.paramMap.get('offset');
    this.view = this.activatedRoute.snapshot.paramMap.get('view');

    if(this.view == 'grid'){
      this.gridSelected = true;
      this.tableSelected = false;
    }
    else{
      this.gridSelected = false;
      this.tableSelected = true;
    }
  }

  selectTableView() {
    this.view = "table";
    this.gridSelected = false;
    this.tableSelected = true;
  }

  selectGridView() {
    this.view = "grid";
    this.gridSelected = true;
    this.tableSelected = false;
  }
}
