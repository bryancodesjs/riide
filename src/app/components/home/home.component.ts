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
  english = true;
  spanish = false;
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
    featureOnetitle : "Airport Pickup",
    featureOnetext: "We wait for you at any airport in the DR",
    featureOnepara : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta animi vel placeat nulla.",
    featureTwotag : "Ride to any airport",
    featureTwotitle : "We take you to any airport in the DR 24/7",
    featureTwotext : "Timely express ride to all airports",
    featureTwopara : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta animi vel placeat nulla.",
    featureThreetag : "Door-to-door",
    featureThreetitle : "You choose a destination and we take you there",
    featureThreetext : "For business, leisure or express commutes accross any city",
    featureThreepara : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta animi vel placeat nulla.",
    gpstitle : "Travel Safe",
    gpssub : "GPS-monitored fleet 24/7",
    fleettitle:"Riide Fleet",
    fleetsub:"Ride with Comfort",
    large:"large",
    small:"small",
    from:"from",
    to: 'To',
    ratesTitle: 'Service Rates',
    ratesSub: 'Lorem ipsum dolor sit.',
    estcost: 'Est. Cost.',
    company: 'Company',
    socialtitle: 'Social Media',
    bookingtag: 'BOOKING',
    bookingtitle: 'BOOK A RIDE',
    bookingmenuheader: 'Please choose a service',
    airportservice: 'Airport Transportation',
    airportdescription: 'Ride from and to any airport in the DR',
    privateservice: 'Private Transportation',
    privatedescription: 'Door-to-door transportation to and from all cities in the country',
    datetimebtn: 'Date & Time',
    whentravel: 'When are you traveling?',
    datelabel: 'Trip Date',
    pickuptimelabel: 'Pickup Time',
    pickuplocation: 'Service Pickup Location',
    destinationlabel: 'Destination',
    addDestination: 'Add another destination',
    returncheck: 'I will return to pickup location',
    servicetype: 'Service Type',
    passengersbtn: 'Passengers',
    fielderror: 'This field cannot be empty',
    flight: 'Flight Number',
    howmany: 'How many passengers are you?',
    lgluggage: 'Large Luggage',
    smluggage: 'Small Luggage',
    specificcar: 'I want an specific vehicule',
    datebtn: 'Date',
    contactbtn: 'Contact Information',
    fullname: 'Your Full Name',
    phone: 'Whatsapp / Phone Number',
    email: 'Email',
    addmoredetails: 'Any additional details?',
    moredetails: 'Additional Details',
    reviewbtn: 'Review',
    reviewtitle: 'Review your Reservation',
    customer: 'Customer',
    submitbtn: 'Submit',
    submitted: 'Your reservation has been submitted!',
    submittedmsj: 'A team member will reach out to you via email or phone to provide you with a copy of this reservation, the cost of the service and indications to proceed with your payment.',
    leavemsj: 'You may now leave this page.',
    luggage: 'Luggage',
    ourservices: 'Our Services'
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
    featureOnetag : "Servicio de Recogida",
    featureOnetitle : "Transporte desde el aeropuerto",
    featureOnetext: "Esperamos por ti en cualquier aeropuerto del país",
    featureOnepara : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta animi vel placeat nulla.",
    featureTwotag : "Transporte hacia el aeropuerto",
    featureTwotitle : "Te llevamos a cualquier aeropuerto 24/7",
    featureTwotext : "Viaje comodo y expreso a cualquier aeropuerto",
    featureTwopara : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta animi vel placeat nulla.",
    featureThreetag : "Transporte puerta a puerta",
    featureThreetitle : "Tu eliges el destino y te llevamos puerta a puerta",
    featureThreetext : "Para viajes de negocios, vacaciones y movimientos expresos en la ciudad",
    featureThreepara : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae soluta animi vel placeat nulla.",
    gpstitle : "Viaja Seguro",
    gpssub : "Flotilla Monitoreada por GPS 24/7",
    fleettitle:"Nuestra Florilla",
    fleetsub:"Viaja con Comodidad",
    large:"Gde.",
    small:"Peq.",
    from:"Desde",
    to:"Hacia",
    ratesTitle: 'Tarifas de Servicio',
    ratesSub: 'Lorem ipsum dolor sit.',
    estcost: 'Costo Aprox.',
    company: 'Compañia',
    socialtitle: 'Redes Sociales',
    bookingtag: 'RESERVAS',
    bookingtitle: 'Reserve su Viaje',
    bookingmenuheader: 'Elija un Servicio',
    airportservice: 'Transporte desde Aeropuerto',
    airportdescription: 'Viaje desde y hacia cualquier aeropuerto',
    privateservice: 'Transporte Privado',
    privatedescription: 'Viaje puerta a puerta en todo el pais',
    datetimebtn: 'Fecha y Hora',
    whentravel: '¿Cuando vas a viajar?',
    datelabel: 'Fecha de Reserva',
    pickuptimelabel: 'Hora de Recogida',
    pickuplocation: 'Lugar de Recogida',
    destinationlabel: 'Lugar de Destino',
    addDestination: 'Agregar destino adicional',
    returncheck: 'Voy a retornar al punto de recogida',
    servicetype: 'Tipo de Servicio',
    passengersbtn: 'Pasajeros',
    fielderror: 'Este campo no puede estar vacío',
    flight: 'Numero de Vuelo',
    howmany: '¿Cuantos pasajeros van en el viaje?',
    lgluggage: 'Maletas Grandes',
    smluggage: 'Maletas Pequeñas',
    specificcar: 'Quiero un vehiculo específico',
    datebtn: 'Fecha',
    contactbtn: 'Informacion de Contacto',
    fullname: 'Nombre Completo',
    phone: 'Whatsapp / Telefono',
    email: 'Correo Electrónico',
    addmoredetails: 'Agregar detalles adicionales',
    moredetails: 'Detalles Adicionales',
    reviewbtn: 'Revisar',
    reviewtitle: 'Revisar su Reservación',
    customer: 'Cliente',
    submitbtn: 'Enviar',
    submitted: 'Su reservación ha sido enviada!',
    submittedmsj: 'Un miembro del equipo se pondrá en contacto con usted por correo electrónico o por teléfono para facilitarle una copia de esta reserva, el coste del servicio y las indicaciones para proceder al pago.',
    leavemsj: 'Ya puede cerrar esta ventana.',
    luggage: 'Equipaje',
    ourservices: 'Nuestros Servicios'
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
    price: '35',
    seats: '2',
    luggagelarge: '1',
    luggagesmall: '3',
    img: 'elantra'
  },
  {
    make: 'chrysler',
    model:'town and country',
    price: '50',
    seats: '5',
    luggagelarge: '3',
    luggagesmall: '5',
    img: 'town-and-country'
  },
  {
    make: 'ford',
    model:'focus',
    price: '35',
    seats: '2',
    luggagelarge: '1',
    luggagesmall: '3',
    img: 'focus'
  },
  {
    make: 'hyundai',
    model:'tucson',
    price: '50',
    seats: '3',
    luggagelarge: '2',
    luggagesmall: '1',
    img: 'tucson'
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
  goTo(url: string) {
    window.open(url, "_blank");
  }
}
