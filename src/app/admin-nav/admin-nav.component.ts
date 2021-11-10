import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  constructor(public authService: AuthService, public Router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut();
    this.Router.navigateByUrl('/login');
  }

}
