import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/services/auth.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  status = false;

  constructor(private authService: Auth, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form): void {
    this.authService.login(form.value).subscribe(res => {
      if (res.dataUser.email != "" && res.dataUser.accessToken != "") {
        this.router.navigateByUrl('/home');
      }else{       
        alert('Error en las credenciales')
      }

    });
  }
}
