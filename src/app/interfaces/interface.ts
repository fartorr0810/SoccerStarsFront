import { Byte } from "@angular/compiler/src/util";

export interface AuthResponse{
  access_token:string,
  idusuario:string,
  rol:string,
  nombreusuario:string

}
export interface Notificacion{
  mensaje:string,
  tipo:string,
  estado:boolean,
  emisor: number,
  asunto:string,
  id:number,
  liga:string,
  nombreemisor:string,
  nombredestino:string
}

export interface MensajeUser{
  emisor?:number,
  destino:number,
  mensaje:string,
  asunto:string,
  tipo?:string
}


export interface CrearNotificacion{
  mensaje:string,
  tipo:string,
  liga:string
}
export interface UsuarioLogin{
  email:string,
  password:string
}

export interface UsuarioRegister{
  email:string,
  password:string,
  nombreusuario:string,
  rol:string

}

export interface UsuarioInfo{
  nombreusuario:string;
}

export interface Mensaje{
  nombre:string,
  apellidos:string,
  email:string,
  comentario:string
}
export interface Solicitud{
  tipo:"unir",
  mensaje:string
}
export interface Respuesta{
  respuesta:boolean
}

// Interfaces que usaremos para obtener los objetos de las peticiones
export interface Usuario{
  id:number,
  email:string,
  nombreusuario:string,
  rol:string
}

export interface UsuarioResponse{
  id?:number,
  email:string,
  nombreusuario:string,
}

export interface UsuarioEdit{
  email:string,
  nombreusuario:string,
  password:string,
}
export interface Oferta{
  idjugador:number,
  precio:number
}
export interface Jugador{
  id:number,
  nombre:string,
  edad:string,
  peso:string,
  altura:string,
  estatus:string,
  indiceVictoria:number,
  imagen:string,
  precio:number
}
export interface Alineacion{
  idpartido:number,
  listajugador: Jugador[]
}
export interface Ligas{
  nombre:string,
  miembros: number,
  nombreAdmin: string,
  id:number

}


export interface Equipo{
  id:number,
  nombre:string,
  imagen:Byte[],
  presupuesto:number,
  jugadores:Jugador[],
  golesAFavor:number,
  golesEncontra:number,
  puntos:number
}

export interface EquipoDTO{
  nombre:string
}

export interface Liga{
  nombre:string
}

export interface Partido{
  id:number,
  local:Equipo,
  visitante:Equipo,
  golesLocal:number,
  golesVisitante:number
}


export interface Jornada{
  id:number,
  partidos:Partido[],
  jugado:boolean
  jugadaAnterior:boolean
}

export interface LigaJornadas{
  id:number,
  nombre:string,
  equipos:Equipo[],
  administrador:Usuario,
  estado:boolean,
  jornadas:Jornada[]
}




export interface LigaDTO{
  nombre:string,
  miembros:number,
  nombreAdmin:string
}
export interface PartidoUser{
  idpartido:number,
  idequipolocal:number,
  nombrequipolocal:string,
  idequipovisitante:number
  nombrequipovisitante:string,
  golesLocal:number
  golesVisitante:number,
  jugado:boolean

}

export interface VerJornadasUser{
  id:number,
  listapartidos: PartidoUser[],
  jugado:boolean
}
export interface JornadaRespuesta{
  idequipouser: any;
  listapartidos: PartidoUser[];
  id: any;
  item: any;
  VerJornadasUser:VerJornadasUser[]
}
export interface OperacionPresupuesto{
  tipo:string,
  cantidad:number,
  tipoo:string
}


export interface MensajeResponse{
  nombreEmisor:string,
  nombreDestinatario:string,
  fecha:Date,
  asunto:string,
  mensaje:string
}
