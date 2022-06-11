import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse, LigaJornadas} from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class UserSubjectNavbarService {

  private _userDetails:BehaviorSubject<AuthResponse | null> =  new BehaviorSubject<AuthResponse | null>(null);
  private _equipoName:BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private _userName:BehaviorSubject<string |null> = new BehaviorSubject<string | null>(null);
  private _liga:BehaviorSubject<LigaJornadas | null> = new BehaviorSubject<LigaJornadas | null>(null);
  private _presupuesto:BehaviorSubject<number | null> = new BehaviorSubject<number |null>(null);

  public userDetails$: Observable<AuthResponse | null> =
  this._userDetails.asObservable();

  public equipoName$: Observable<string | null>=
  this._equipoName.asObservable();


  public userName$: Observable<string | null>=
  this._userName.asObservable();


  public liga$: Observable<LigaJornadas | null>=
  this._liga.asObservable();


  public presupuesto$: Observable<number | null>=
  this._presupuesto.asObservable();


  constructor() { }

  changeNavBar(userDetails: AuthResponse | null) {
    this._userDetails.next(userDetails);
  }

  rechargeNameEquipo(equipoName:string| null){
    this._equipoName.next(equipoName);
  }


  rechargeNameUser(userName:string| null){
    this._userName.next(userName);
  }

  rechargeMiembrosLiga(liga:LigaJornadas | null){
    this._liga.next(liga);
  }


  rechargePresupuesto(presupuesto:number){
    this._presupuesto.next(presupuesto);
  }


  changeNavBarNull() {
    this._userDetails.next(null);
    this._equipoName.next(null);
    this._userName.next(null);
    this._liga.next(null);
    this._presupuesto.next(null);
  }


}
