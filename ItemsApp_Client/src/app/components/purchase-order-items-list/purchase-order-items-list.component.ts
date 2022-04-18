import { Component, Inject, OnInit } from '@angular/core';
import { PurnchaseOrderItem } from 'src/app/models/purnchaseOrderItem';
import { PurnchaseOrderItemsService } from 'src/app/services/purnchase-order-items.service';
import { finalize } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-order-items-list',
  templateUrl: './purchase-order-items-list.component.html',
  styleUrls: ['./purchase-order-items-list.component.css']
})
export class PurchaseOrderItemsListComponent implements OnInit {

  purnchaseOrderItems: PurnchaseOrderItem[] = [];
  displayedColumns: string[] = ['name', 'price'];
  isLoading: boolean = false;
  createItemFormData = {
    name: undefined,
    price: undefined,
  }

  constructor(private purnchaseOrderItemsService: PurnchaseOrderItemsService) { }

  ngOnInit() {
    this.getPurnchaseOrderItems(undefined);
  }

  getPurnchaseOrderItems(callback: () => void) {
    this.purnchaseOrderItemsService.getPurnchaseOrderItems()
    .pipe(finalize(()=>{
      if (callback) {
        callback();
      }
    }))
    .subscribe((items: PurnchaseOrderItem[]) => {
      this.purnchaseOrderItems = items;
    })
  }

  createPurnchaseOrderItems() {
    this.isLoading = true;
    this.purnchaseOrderItemsService.createPurnchaseOrderItem(this.createItemFormData)
    .subscribe(() => {
      this.createItemFormData = {
        name: undefined,
        price: undefined
      }
      this.getPurnchaseOrderItems(() => {
        this.isLoading = false;
      });
    }, error => {
      this.isLoading = false;
    })
  }

}
