import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private dbPath = '/reservations';

  bookingRef: AngularFireList<Reservation>;

  constructor(private db: AngularFireDatabase) {
    this.bookingRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Reservation> {
    return this.bookingRef;
  }

  create(reservation: Reservation): any {
    return this.bookingRef.push(reservation);
  }

  update(key: string, value: any): Promise<void> {
    return this.bookingRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.bookingRef.remove(key);
  }
  
}
