import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { PurchaseOrderItemsListComponent } from './components/purchase-order-items-list/purchase-order-items-list.component';
import { PurchaseOrdersListComponent } from './components/purchase-orders-list/purchase-orders-list.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table'  
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateEditOrderModalComponent } from './components/purchase-orders-list/create-edit-order-modal/create-edit-order-modal.component';
  
@NgModule({
  declarations: [
    // Components
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    PurchaseOrderItemsListComponent,
    PurchaseOrdersListComponent,
    CreateEditOrderModalComponent,

    //Pipes
    OrderStatusPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  exports: [
    MatFormFieldModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
