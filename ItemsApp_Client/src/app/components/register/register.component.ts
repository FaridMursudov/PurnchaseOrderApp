import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private accountService: AccountService,
    private toastrService: ToastrService) { }

  ngOnInit() { }

  register() {
    this.accountService.register(this.model)
    .subscribe((response) => {
      this.cancel();
    }, error => {
      //this.toastrService.error(error.error);
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
