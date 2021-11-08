import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Rates } from '../models/rates.model';

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  //Firebase route where info is stored
  private dbPath = '/rates';
  ratesRef: AngularFireList<Rates>;

  constructor(private db: AngularFireDatabase) { 
    this.ratesRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Rates> {
    return this.ratesRef;
  }
  create(Rates: Rates): any {
    return this.ratesRef.push(Rates);
  }

  update(key: string, value: any): Promise<void> {
    return this.ratesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.ratesRef.remove(key);
  }
}
