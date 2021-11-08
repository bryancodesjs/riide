import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { map } from 'rxjs/operators';
import { RatesService } from 'src/app/services/rates.service';
import { Rates } from 'src/app/models/rates.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //booking navigation variables
  isbooking = false;
  isabout = false;
  adddetails = false;
  airportservice = false;
  privateservice = false;
  secondDestination = false;
  wantsSpecificCar = false;
  isareturntrip = false;
  latestID = 0;
  //language variables
  english = true;
  spanish = false;
  currentLang = 'english';
  //languageObject
  currentlang: any = {};
  //idioma ingles
  langEng = {
    nav1: 'Book a Ride',
    nav2 : "About Us",
    nav3 : "Contact",
    headertitle: "Go anywhere in the dominican republic",
    headersubtitle : "Safe and reliable transportation. Available 24/7",
    headerbuttontext : "Book a Ride",
    featureOnetag : "go anywhere",
    featureOnetitle : "Door-to-Door Transportation",
    featureOnetext: "We take you anywhere you want in the DR",
    featureOnepara : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta animi vel placeat nulla.",
    featureTwotag : "your travel partner",
    featureTwotitle : "Riide From and To all Airports",
    featureTwotext : "Timely express ride from and to all airports",
    featureTwopara : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta animi vel placeat nulla.",
    featureThreetag : "we take you there",
    featureThreetitle : "Visit Our Best Destinations",
    featureThreetext : "Enjoy our best beaches, mountainviews and hotels",
    featureThreepara : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta animi vel placeat nulla.",
    gpstitle : "travel safe",
    gpssub : "GPS-monitored fleet 24/7",
    fleettitle:"Riide Fleet",
    fleetsub:"Ride with Comfort",
    large:"large",
    small:"small",
    from:"from"
  }

  //revervacion almacenada en memoria enlazada al formulario
  currentBooking: Reservation = {
    type: '',
    reservationNumber: '',
    flightnumber: '',
    date: '',
    dateTwo: '',
    time: '',
    timeTwo: '',
    from: '',
    destination: '',
    destinationTwo: '',
    passengers: '',
    lgluggage: '',
    smluggage: '',
    fullname: '',
    phone: '',
    email:'',
    details:'',
    car: '',
    driver: '',
    status: '1'
  }
  //reservation
  reservation?: Reservation[];

  //rates
  Rates?: Rates[];

  //mockup car collection
  cars = [
  {
    make: 'hyundai',
    model:'elantra',
    price: '26',
    seats: '3',
    luggagelarge: '1',
    luggagesmall: '3',
    img: 'elantra'
  },
  {
    make: 'chrysler',
    model:'town and country',
    price: '45',
    seats: '5',
    luggagelarge: '3',
    luggagesmall: '5',
    img: 'town-and-country'
  },
  {
    make: 'toyota',
    model:'corolla',
    price: '26',
    seats: '3',
    luggagelarge: '1',
    luggagesmall: '3',
    img: 'corolla'
  },
  {
    make: 'hyundai',
    model:'h1',
    price: '50',
    seats: '7',
    luggagelarge: '4',
    luggagesmall: '5',
    img: 'h1'
  },
  ]
  //car collection on the booking form
  originalCars: any = [];

  constructor(private _bookingservice: ReservationService, private _ratesService: RatesService) { }

  ngOnInit(): void {
    //retrieves all records from firebase
    this._bookingservice.getAll().snapshotChanges().pipe(
      map(a =>
        a.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.latestID = data.length; 
    });

    //retrieves all rates
    this._ratesService.getAll().snapshotChanges().pipe(
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
  //muestra la seccion de 'nosotros'
  about() {
    this.isabout = true;
    this.isbooking = false;
  }
  //esta funcion crea una reservacion en la base de datos
  book() {
    //console.log(this.currentBooking);
    (document.getElementById('review') as HTMLElement).className = "d-none";
    (document.getElementById('congratulations') as HTMLElement).className = "row mb-3 mt-5";
    this._bookingservice.create(this.currentBooking).then(() => {
      console.log('successful reservation');
      console.log(this.currentBooking);
    })
  }
  //muestra el formulario de reservaciones
  bookingForm() {
    this.isbooking = true;
    this.isabout = false;
    this.originalCars = this.cars;
    this.currentBooking.code = this.latestID + 1;
    console.log(this.currentBooking.code);
  }
  //elige 'aeropuerto' como tipo de viaje
  chooseAirport() {
    this.airportservice = true;
    this.privateservice = false;
    this.currentBooking.type = '0'; //0 = airport, 1 = private
    (document.getElementById('airportcard') as HTMLElement).className = "service-card active";
    (document.getElementById('privatecard') as HTMLElement).className = "service-card";
  }
  //elige puerta a puerta como tipo de viaje
  choosePrivate() {
    this.privateservice = true;
    this.airportservice = false;
    this.currentBooking.type = '1'; //0 = airport, 1 = private
    (document.getElementById('airportcard') as HTMLElement).className = "service-card";
    (document.getElementById('privatecard') as HTMLElement).className = "service-card active";
  }
  //muestra el input para agregar destino secundario
  addSecondDestination() {
    this.secondDestination = true;
  }
  returnTrip() {
    this.isareturntrip = true;
    this.currentBooking.destinationTwo = this.currentBooking.from;
  }
  //va a elegir un vehiculo especifo
  specificCar() {
    if(this.wantsSpecificCar) {
      this.wantsSpecificCar = false;
    } else {
      this.wantsSpecificCar = true;
    }
  }
  //este es el vehiculo que el cliente quiere utilizar
  preferedCar(carmodel: string) {
    //ingresa el modelo del vehiculo en el formulario que va para firebase
    this.currentBooking.car = carmodel; 
    var filteredcars = this.cars.filter(a => a.model.includes(carmodel));
    //guarda los autos originales en caso de que el usuario desee cambiar
    this.originalCars = this.cars;
    //modifica el objeto de 'cars' para que solo se muestre el auto seleccionado 
    this.cars = filteredcars;
    //console.log(filteredcars);
  }
  //ir al paso cero
  showStepZero() {
    (document.getElementById('stepZero') as HTMLElement).className = "row mb-3";
    (document.getElementById('stepOne') as HTMLElement).className = "d-none";
    (document.getElementById('stepTwo') as HTMLElement).className = "d-none";
    (document.getElementById('stepThree') as HTMLElement).className = "d-none";
    (document.getElementById('congratulations') as HTMLElement).className = "d-none";
  }
  //ir al paso uno
  showStepOne() {
    (document.getElementById('stepZero') as HTMLElement).className = "d-none";
    (document.getElementById('stepOne') as HTMLElement).className = "row mb-3";
    (document.getElementById('stepTwo') as HTMLElement).className = "d-none";
    (document.getElementById('stepThree') as HTMLElement).className = "d-none";
    (document.getElementById('congratulations') as HTMLElement).className = "d-none";
  }
  //ir al paso dos
  showStepTwo() {
    (document.getElementById('stepZero') as HTMLElement).className = "d-none";
    (document.getElementById('stepThree') as HTMLElement).className = "d-none";
    (document.getElementById('stepTwo') as HTMLElement).className = "row mb-3";
    (document.getElementById('stepOne') as HTMLElement).className = "d-none";
    (document.getElementById('congratulations') as HTMLElement).className = "d-none";
  }
  //ir al paso tres
  showStepThree() {
    (document.getElementById('stepZero') as HTMLElement).className = "d-none";
    (document.getElementById('stepOne') as HTMLElement).className = "d-none";
    (document.getElementById('stepTwo') as HTMLElement).className = "d-none";
    (document.getElementById('stepThree') as HTMLElement).className = "row mb-3";
    (document.getElementById('congratulations') as HTMLElement).className = "d-none";
  }
  //muestra review final
  review() {
    (document.getElementById('stepZero') as HTMLElement).className = "d-none";
    (document.getElementById('stepOne') as HTMLElement).className = "d-none";
    (document.getElementById('stepTwo') as HTMLElement).className = "d-none";
    (document.getElementById('stepThree') as HTMLElement).className = "d-none";
    (document.getElementById('review') as HTMLElement).className = "row mb-3";
    (document.getElementById('congratulations') as HTMLElement).className = "d-none";
  }
  //muestra el textarea de detalles adicionales
  addDetails(){
    if(this.adddetails) {
      this.adddetails = false;
    } else {
      this.adddetails = true;
    }
  }
  //reload page
  reload(): void {
    window.location.reload();
  }
  //language switch
  switchLang() {
    if(this.english) {
      this.english = false;
      this.spanish = true;
      this.currentLang = 'español';
    } else {
      this.english = true;
      this.spanish = false;
      this.currentLang = 'English';
    }
  }
}
