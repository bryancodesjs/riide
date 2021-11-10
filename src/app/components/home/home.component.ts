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

  //booking error variables
  //STEP 1 errors
  dateerror = false;
  timeerror = false;
  fromerror = false;
  destinationerror = false;
  //STEP 2 errors
  passengerserror = false;
  lgluggageerror = false;
  smluggageerror = false;
  //STEP 3 errors
  fullnameerror = false;
  phoneerror = false;
  emailerror = false;


  //language variables
  english = false;
  spanish = true;
  //languageObject
  currentlang: any = {};
  //idioma ingles
  lang = 
    {
    name: 'English',
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
    from:"from",
    to: 'To',
    ratesTitle: 'Service Rates',
    ratesSub: 'Lorem ipsum dolor sit.',
    estcost: 'Est. Cost.'
  }

  langEs = 
    {
    name: "Español",
    nav1: 'Reserva',
    nav2 : "Nosotros",
    nav3 : "Contacto",
    headertitle: "Ve a cualquier parte en Republica Dominicana",
    headersubtitle : "Transporte puntual y seguro las 24 horas",
    headerbuttontext : "Reservar un Servicio",
    featureOnetag : "Ve a cualquier lado",
    featureOnetitle : "Transporte Puerta a Puerta",
    featureOnetext: "Te llevamos a cualquier punto de la isla",
    featureOnepara : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta animi vel placeat nulla.",
    featureTwotag : "Tu compañero de viajes",
    featureTwotitle : "Transporte desde y hacia todos los aeropuertos",
    featureTwotext : "Llegamos a tiempo y esperamos por ti en y hacia todos los aeropuertos",
    featureTwopara : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta animi vel placeat nulla.",
    featureThreetag : "Conoce",
    featureThreetitle : "Visita los mejores destinos",
    featureThreetext : "Disfruta de nuestras mejores playas, vistas y hoteles",
    featureThreepara : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta animi vel placeat nulla.",
    gpstitle : "Viaja Seguro",
    gpssub : "Flotilla Monitoreada por GPS 24/7",
    fleettitle:"Nuestra Florilla",
    fleetsub:"Viaja Confortable",
    large:"Gde.",
    small:"Peq.",
    from:"Desde",
    to:"Hacia",
    ratesTitle: 'Tarifas de Servicio',
    ratesSub: 'Lorem ipsum dolor sit.',
    estcost: 'Costo Aprox.'
  }

  translate(){
    if(this.english) {
      this.english = false;
      this.spanish = true;
      this.currentlang = this.langEs;
      
    } else {
      this.spanish = false;
      this.english = true;
      this.currentlang = this.lang;
    }
    // this.currentlang = this.lang;
    // console.log(this.currentlang);
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
    this.translate();
    this.retrieveAllRecords();
    this.retrieveAllRates();
  }
  retrieveAllRecords() {
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
  }
  retrieveAllRates() {
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
  //this function resets all error messages in the reservation form
  resetErrors() {
    //errors step 1
    this.timeerror = false;
    this.dateerror = false;
    this.destinationerror = false;
    this.fromerror = false;
    //errors step 2
    this.passengerserror = false;
    this.lgluggageerror = false;
    this.smluggageerror = false;
    //errors step 3
    this.fullnameerror = false;
    this.phoneerror = false;
    this.emailerror = false;
  }
  //ir al paso dos
  showStepTwo() {
    this.resetErrors();
    if(this.currentBooking.date != '') { //if date isnt empty
      if(this.currentBooking.time != '') { //if time isnt empty
        if(this.currentBooking.from != '') { //if pickup location isnt empty
          if(this.currentBooking.destination != '') { //if destination isn't empty
            (document.getElementById('stepZero') as HTMLElement).className = "d-none";
            (document.getElementById('stepThree') as HTMLElement).className = "d-none";
            (document.getElementById('stepTwo') as HTMLElement).className = "row mb-3";
            (document.getElementById('stepOne') as HTMLElement).className = "d-none";
            (document.getElementById('congratulations') as HTMLElement).className = "d-none";
          } else {
            this.destinationerror = true;
          }
        } else {
          this.fromerror = true;
        }
      } else {
        this.timeerror = true;
      }
    } else {
      this.dateerror = true;
    }
    // (document.getElementById('stepZero') as HTMLElement).className = "d-none";
    // (document.getElementById('stepThree') as HTMLElement).className = "d-none";
    // (document.getElementById('stepTwo') as HTMLElement).className = "row mb-3";
    // (document.getElementById('stepOne') as HTMLElement).className = "d-none";
    // (document.getElementById('congratulations') as HTMLElement).className = "d-none";
  }
  //ir al paso tres
  showStepThree() {
    this.resetErrors();
    if(this.currentBooking.passengers != '') {
      if(this.currentBooking.lgluggage != ''){
        if(this.currentBooking.smluggage != '') {
          (document.getElementById('stepZero') as HTMLElement).className = "d-none";
          (document.getElementById('stepOne') as HTMLElement).className = "d-none";
          (document.getElementById('stepTwo') as HTMLElement).className = "d-none";
          (document.getElementById('stepThree') as HTMLElement).className = "row mb-3";
          (document.getElementById('congratulations') as HTMLElement).className = "d-none";
        } else {
          this.smluggageerror = true;
          this.currentBooking.smluggage = '';
        }
      } else {
        this.lgluggageerror = true;
        this.currentBooking.lgluggage = '';
      }
    } else {
      this.passengerserror = true;
      this.currentBooking.passengers = '';
    }
    // (document.getElementById('stepZero') as HTMLElement).className = "d-none";
    // (document.getElementById('stepOne') as HTMLElement).className = "d-none";
    // (document.getElementById('stepTwo') as HTMLElement).className = "d-none";
    // (document.getElementById('stepThree') as HTMLElement).className = "row mb-3";
    // (document.getElementById('congratulations') as HTMLElement).className = "d-none";
  }
  //muestra review final
  review() {
    this.resetErrors();
    if(this.currentBooking.fullname != '') {
      if(this.currentBooking.phone != '') {
        if(this.currentBooking.email != '') {
          (document.getElementById('stepZero') as HTMLElement).className = "d-none";
          (document.getElementById('stepOne') as HTMLElement).className = "d-none";
          (document.getElementById('stepTwo') as HTMLElement).className = "d-none";
          (document.getElementById('stepThree') as HTMLElement).className = "d-none";
          (document.getElementById('review') as HTMLElement).className = "row mb-3";
          (document.getElementById('congratulations') as HTMLElement).className = "d-none";
        } else {
          this.emailerror = true;
        }
      } else {
        this.phoneerror = true;
      }
    } else {
      this.fullnameerror = true;
    }
    // (document.getElementById('stepZero') as HTMLElement).className = "d-none";
    // (document.getElementById('stepOne') as HTMLElement).className = "d-none";
    // (document.getElementById('stepTwo') as HTMLElement).className = "d-none";
    // (document.getElementById('stepThree') as HTMLElement).className = "d-none";
    // (document.getElementById('review') as HTMLElement).className = "row mb-3";
    // (document.getElementById('congratulations') as HTMLElement).className = "d-none";
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
    } else {
      this.english = true;
      this.spanish = false;
    }
  }
}
