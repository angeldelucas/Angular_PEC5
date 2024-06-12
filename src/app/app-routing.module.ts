import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { GridItemsComponent } from './components/grid-items/grid-items.component';
import { TableItemsComponent } from './components/table-items/table-items.component';

const routes: Routes = [
  { path: '', component: ItemsComponent},
  { path: ':offset/:view', component: ItemsComponent},
  // { path: 'grid/:offset/:view', component: GridItemsComponent},
  // { path: 'grid', component: GridItemsComponent},
  // { path: 'table', component: TableItemsComponent},
  { path: 'pokemon/:id/:offset/:view', component: ItemDetailComponent},
  { path: '**', component: ItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
