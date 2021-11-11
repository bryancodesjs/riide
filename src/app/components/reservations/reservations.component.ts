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
  totalnumberofreservations: number = 0;
  //selected
  selected:any = '';
  selectedReserv: Reservation = {};
  //reservation tabs
  pendientes = true;
  completadas = false;
  canceladas = false;
  //
  //
  reservationUpdated = false;
  constructor(private _bookingservice: ReservationService, public authService: AuthService) { }

  ngOnInit(): void {
    this.retrieve('1');
  }

  retrieve(ab: string): void {
    this._bookingservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      var fam = data.reverse();
      var filtered = fam.filter(a => a.status == ab);
      this.reservations = filtered;
      // this.reservations = data.reverse(); 
      // this.totalnumberofreservations = this.reservations.length;
    });
    
  }
  select(key: any, id: any, obj: any): void {
    this.reservationUpdated = false;
    this.selectedReserv = obj;
    this.toggleEditModal();
  }
  toggleEditModal() {
    if((document.getElementById('modalForEditing')as HTMLElement).className == "modal fade show d-block") {
      (document.getElementById('modalForEditing')as HTMLElement).className = "modal fade";
      (document.getElementById('_body')as HTMLElement).className = "";
      this.selectedReserv = {};
    } else {
      (document.getElementById('modalForEditing')as HTMLElement).className = "modal fade show d-block";
      (document.getElementById('_body')as HTMLElement).className = "overflow-hidden";
    }
  }
  resetSelect(): void {
    this.selected = '';
  }
  update(key: any): void {
    // console.log(key);
    // console.log(this.selectedReserv);
    this._bookingservice.update(key, this.selectedReserv);
    this.reservationUpdated = true;
  }
  console(){
    console.log(this.reservations);
  }
  toggleFilter(filter: string) {
    switch(filter){
      case '0':
        this.retrieve(filter);
        this.canceladas = true;
        this.pendientes = false;
        this.completadas = false;
        var filt = this.reservations?.filter(a => a.status == filter);
        this.reservations = filt;
        break;
      case '1':
        this.retrieve(filter);
        this.canceladas = false;
        this.pendientes = true;
        this.completadas = false;
        var filt = this.reservations?.filter(a => a.status == filter);
        this.reservations = filt;
        break;
      case '2':
        this.retrieve(filter);
        this.canceladas = false;
        this.pendientes = false;
        this.completadas = true;
        var filt = this.reservations?.filter(a => a.status == filter);
        this.reservations = filt;
        break;
      default:
        this.retrieve('1');
        this.canceladas = false;
        this.pendientes = true;
        this.completadas = false;
        var filt = this.reservations?.filter(a => a.status == '1');
        this.reservations = filt;
        break;
        
    }
  }
}
