import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any  = {};

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit() { }

  login() {
    this.accountService.login(this.model).subscribe((response) => {
      this.router.navigateByUrl('/purchase-orders-list')
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
