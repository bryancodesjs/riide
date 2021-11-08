import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut();
  }

}
