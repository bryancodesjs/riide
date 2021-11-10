export class Reservation {
    key?: string | null; 
    code?: number; //id unico de reservacion
    type?: string; //tipo de servicio | 0 = aeropuerto, 1 = puerta a puerta
    reservationNumber?: string; //# de reservacion
    flightnumber?: string; //numero de vuelo
    date?: string; //fecha principal
    dateTwo?: string; //fecha de destino secundario
    time?: string; //hora principal
    timeTwo?: string; //hora de destino secundario
    from?: string; //punto de recogida
    destination?: string; //destino principal
    destinationTwo?: string; //destino secundario (opcional)
    passengers?: string; //cantidad de pasajeros
    lgluggage?: string; //maletas grandes
    smluggage?: string; //maletas peq.
    fullname?: string; //nombre completo del reservante
    phone?: string; //telefono del reservante
    email?:string; //correo del reservante
    details?:string; //detalles adicionales de la reservacion
    car?: string; //vehiculo preferido
    driver?: string; //conductor asignado
    status?: string; //estado de la reservacion | 0 = cancelado, 1 = pendiente, 2 = completado
    cost?: number; //costo de la reservacion | se asigna solo desde backoffice
}
