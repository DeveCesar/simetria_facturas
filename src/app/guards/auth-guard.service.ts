import { Injectable } from '@angular/core';
import { Auth } from '../services/auth.service.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _authService: Auth, private _router: Router) { }

  canActivate(){
    if (!this._authService.isAuthenticated()) {
      alert('No estas logeado');
      this._router.navigateByUrl('/auth/login');
      return false;
    }
      return true;
  }


}

