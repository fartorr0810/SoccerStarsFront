import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse } from 'src/app/interfaces/interface';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails!: AuthResponse | null;
  private jwt:JwtHelperService= new JwtHelperService();
  constructor( private servicioUsuario:UsuarioService,
    private userSubject:UserSubjectNavbarService) {
      this.userSubject.userDetails$.subscribe((data) => {
        this.userDetails = data;
      });
     }

  ngOnInit(): void {
    let token = this.servicioUsuario.getToken();
    if (token != null) {
      this.userDetails = this.jwt.decodeToken(
        JSON.stringify(token)
      );
      this.userSubject.changeNavBar(this.userDetails);
  }
  }

}
