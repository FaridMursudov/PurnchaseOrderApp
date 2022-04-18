import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CreatePurnchaseOrderInput } from 'src/app/models/createPurnchaseOrderInput';
import { OrderItem } from 'src/app/models/orderItem';
import { PurnchaseOrderItemsService } from 'src/app/services/purnchase-order-items.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-create-edit-order-modal',
  templateUrl: './create-edit-order-modal.component.html',
  styleUrls: ['./create-edit-order-modal.component.css']
})
export class CreateEditOrderModalComponent implements OnInit {

  purnchaseOrderData: CreatePurnchaseOrderInput = new CreatePurnchaseOrderInput();
  newOrderItem: OrderItem = new OrderItem();

  constructor(
    public dialogRef: MatDialogRef<CreateEditOrderModalComponent>,
    private toastrService: ToastrService,
    private purnchaseOrderService: PurnchaseOrderItemsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }

  addItem() {
    if (!this.purnchaseOrderData) {
      this.purnchaseOrderData = new CreatePurnchaseOrderInput();
    }

    if (!this.purnchaseOrderData.orderItems) {
      this.purnchaseOrderData.orderItems = [];
    }

    if (this.purnchaseOrderData.orderItems.length >= 10) {
      this.toastrService.error("Can't add more than 10 item to purnchase order.");
      return;
    }

    const alreadyAddedItem = this.purnchaseOrderData.orderItems.filter((x) => x.name == this.newOrderItem.name);
    if (alreadyAddedItem && alreadyAddedItem.length) {
      this.toastrService.error('This item already added');
      return;
    }

    const alreadyAddedItsmsSum = this.purnchaseOrderData.orderItems.reduce((accumulator, value) => {
      return accumulator + value.price;
    }, 0);

    if ((alreadyAddedItsmsSum + this.newOrderItem.price) > 1000) {
      this.toastrService.error("Total amount can't be greater than 1000");
      return;
    }

    this.purnchaseOrderData.orderItems.map
    this.purnchaseOrderData.orderItems.push(this.newOrderItem);
    this.newOrderItem = new OrderItem();
  }

  deleteItem(name: string) {
    this.purnchaseOrderData.orderItems = this.purnchaseOrderData.orderItems.filter((x) => x.name !== name);
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.purnchaseOrderService.createPurnchaseOrder(this.purnchaseOrderData)
    .subscribe(() => {
      this.close();
    })
  }

}
