import { Component, OnInit } from '@angular/core';
import { RatesService } from 'src/app/services/rates.service';
import { Rates } from 'src/app/models/rates.model';

import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {
  title = 'Tarifas';
  Rates?: Rates[];
  newRate = {
    from : '',
    to : '',
    basecost : '',
  }
  currentFrom = '';
  currentTo = '';
  currentBasecost = '0';
  userIsEditing = false;
  userIsAdding = true;
  userIsDeleting = false;

  editKey:any = '';
  constructor(private _RateServiceInstance: RatesService, public _auth: AuthService) { }

  ngOnInit(): void {
    this.retrieve();
  }
  retrieve(): void {
    this._RateServiceInstance.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Rates = data.reverse(); 
      //this.pending = this.Rates.length;
      // the 'reverse()' function reverts the order in which the array results are shown by default
    });
  }

  toggleModal(){
    //si el modal esta abierto
    if((document.getElementById('tarifaModal') as HTMLElement).className == "modal fade show d-block animate__animated animate__fadeIn quick") {
      //cerrar el modal
      (document.getElementById('tarifaModal') as HTMLElement).className = "modal fade";
      //y resetea los valores del new rate en memoria
      this.resetRates();
    } else {
      //de lo contrario, mostrar el modal
      (document.getElementById('tarifaModal') as HTMLElement).className = "modal fade show d-block animate__animated animate__fadeIn quick";
    }
  }
  saveNew() {
    //console.log(this.newRate);
    this._RateServiceInstance.create(this.newRate);
    this.resetRates();
    this.toggleModal();
  }
  update() {
    this._RateServiceInstance.update(this.editKey, this.newRate);
    this.resetRates();
    this.toggleModal();
  }
  deleteThis() {
    this._RateServiceInstance.delete(this.editKey);
    this.resetRates();
    this.toggleModal();
  }
  //resetea el valor del newRate en memoria
  resetRates() {
    this.newRate.from = '';
      this.newRate.to = '';
      this.newRate.basecost = '';
      this.userIsAdding = true;
      this.userIsEditing = false;
      this.userIsDeleting = false;
  }
  showEdit(key: any, from: any, to: any, cost: any){
    this.editKey = key;
    this.newRate.from = from;
    this.newRate.to = to;
    this.newRate.basecost = cost;
    this.userIsEditing = true;
    this.userIsAdding = false;
    this.userIsDeleting = false;
    this.toggleModal();
  }
  showDelete(key: any, from: any, to: any, cost: any) {
    this.editKey = key;
    this.newRate.from = from;
    this.newRate.to = to;
    this.newRate.basecost = cost;
    this.userIsDeleting = true;
    this.userIsAdding = false;
    this.userIsEditing = false;
    this.toggleModal();
  }
}
