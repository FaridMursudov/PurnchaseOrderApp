import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PurchaseOrderItemsListComponent } from './components/purchase-order-items-list/purchase-order-items-list.component';
import { PurchaseOrdersListComponent } from './components/purchase-orders-list/purchase-orders-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'purchase-orders-list', component: PurchaseOrdersListComponent, canActivate: [AuthGuard] },
  { path: 'purchase-order-items-list', component: PurchaseOrderItemsListComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
