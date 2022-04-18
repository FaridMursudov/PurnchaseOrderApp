import { Component, OnInit } from '@angular/core';
import { PurnchaseOrder } from 'src/app/models/purnchaseOrder';
import { PurnchaseOrderItemsService } from 'src/app/services/purnchase-order-items.service';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditOrderModalComponent } from './create-edit-order-modal/create-edit-order-modal.component';

@Component({
  selector: 'app-purchase-orders-list',
  templateUrl: './purchase-orders-list.component.html',
  styleUrls: ['./purchase-orders-list.component.css']
})
export class PurchaseOrdersListComponent implements OnInit {

  isLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private purnchaseOrderService: PurnchaseOrderItemsService) { }

  displayedColumns: string[] = ['name', 'creationDate', 'orderStatus', 'submittedBy', 'totalPrice', 'actions'];
  purnchaseOrders: PurnchaseOrder[] = [];

  ngOnInit() {
    this.getPurnchaseOrders(undefined);
  }

  getPurnchaseOrders(callback: () => void) {
    this.purnchaseOrderService.getPurnchaseOrders()
    .pipe(finalize(()=>{
      if (callback) {
        callback();
      }
    }))
    .subscribe((items: PurnchaseOrder[]) => {
      this.purnchaseOrders = items;
    })
  }

  submitPurnchaseOrders(id: number) {
    this.isLoading = true;
    this.purnchaseOrderService.submitPurnchaseOrders(id)
    .subscribe((items) => {
      this.getPurnchaseOrders(() => {
        this.isLoading = false;
      })
    })
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(CreateEditOrderModalComponent, {
      width: '80%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      this.getPurnchaseOrders(() => {
        this.isLoading = false;
      })
    });
  }

}
