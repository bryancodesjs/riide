import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reservations?: Reservation[];
  title = 'reservations';
  pending: number = 0;
  //selected
  selected:any = '';
  selectedReserv = {};
  //reservation tabs
  pendientes = true;
  completadas = false;
  eliminadas = false;

  constructor(private _bookingservice: ReservationService, public authService: AuthService) { }

  ngOnInit(): void {
    this.retrieve();
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
  select(key: any, id: any): void {
    if(this.selected == null || this.selected == undefined || this.selected == '') {
      this.selected = key;
      (document.getElementById('tab'+key)as HTMLElement).className = "mt-3 --bg-grey border active";
    } else {
      (document.getElementById('tab'+this.selected)as HTMLElement).className = "mt-3 --bg-grey border";
      this.selected = key;
      (document.getElementById('tab'+key)as HTMLElement).className = "mt-3 --bg-grey border active";
    }
  }
  resetSelect(): void {
    this.selected = '';
  }
  update(key: any): void {
    console.log(key);
    //this._bookingservice.update(key, this.selectedReserv);
  }
  console(){
    console.log(this.reservations);
  }
}
