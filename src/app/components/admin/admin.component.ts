import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  reservations?: Reservation[];
  title = 'reservations';
  pending: number = 0;

  //authentication variables
  email: string = '';
  password: string = '';
  user: string = '';

  constructor(private _bookingservice: ReservationService, public authService: AuthService) { }

  ngOnInit(): void {
    this.retrieve();
  }
  signIn() {
    this.user = this.email;
    this.authService.signIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authService.signOut();
  }

  retrieve(): void {
    this._bookingservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.reservations = data.reverse(); 
      this.pending = this.reservations.length;
      // the 'reverse()' function reverts the order in which the array results are shown by default
    });
  }
}
