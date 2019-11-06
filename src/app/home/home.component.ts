import { Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth.service.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authservice: Auth, private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this.authservice.logout();
    this.router.navigateByUrl("/auth/login");
  }

  toggleBar(){
    $('#sidebar').toggleClass('active');
  }
 

}
