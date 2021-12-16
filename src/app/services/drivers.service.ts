import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Driver } from '../models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriversService {
  private dbpath = '/drivers';
  driverModel: AngularFireList<Driver>;

  constructor(private db: AngularFireDatabase) {
    this.driverModel = db.list(this.dbpath);
  }

  getAll(): AngularFireList<Driver> {
    return this.driverModel;
  }

  create(driver: Driver) {
    return this.driverModel.push(driver)
  }
}
