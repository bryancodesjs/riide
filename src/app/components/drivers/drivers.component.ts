import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication.service';
import { DriversService } from 'src/app/services/drivers.service';
import { map } from 'rxjs/operators';
import { Driver } from 'src/app/models/driver.model';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  constructor(public AuthService: AuthService, public DriverService: DriversService) { }
  
  title = 'Conductores'
  driverInMemory: Driver = {}
  formSubmitted = false;
  //variables enlazadas a los inputs
  fullname = '';
  phone = 0;
  email = '';
  cedula = 0;
  //list of drivers
  driversList:any = [];

  ngOnInit(): void {
    this.retrieveAll();
  }
  retrieveAll() {
    this.DriverService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.driversList = data.reverse();
    });
  }
  createNew() {
    this.driverInMemory.fullname = this.fullname;
    this.driverInMemory.cedula = this.cedula;
    this.driverInMemory.email = this.email;
    this.driverInMemory.phone = this.phone;
    this.DriverService.create(this.driverInMemory);
    this.formSubmitted = true;
  }
  //oculta y muestra el modal para agregar conductor
  toggleModal() {
    if((document.getElementById('addDriverModal')as HTMLElement).className == "d-none") {
      (document.getElementById('addDriverModal')as HTMLElement).className = "modal fade show d-block";
    } else {
      (document.getElementById('addDriverModal')as HTMLElement).className = "d-none";
      this.formSubmitted = false;
      this.resetModal();
    }
  }
  resetModal() {
    this.fullname = '';
    this.cedula = 0;
    this.email = '';
    this.phone = 0;
  }
}
