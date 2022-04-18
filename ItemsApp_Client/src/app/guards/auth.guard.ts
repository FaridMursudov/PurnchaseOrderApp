import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AccountService } from "../services/account.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        public accountService: AccountService,
        private toastrService: ToastrService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) : Observable<boolean> {
        return this.accountService.currentUserObservable.pipe(
            map((user) => {
                if (user) {
                    return true;
                }
                this.toastrService.error('Please login');
            })
        )
    }
}