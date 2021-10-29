import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl:string="https://restcountries.com/v3.1";
  private apiUrlV2:string="https://restcountries.com/v2";

  get httpParams(){
    return new HttpParams().set('fields','name,capital,cca2,alpha2Code,flags,population');
  }

  constructor(private http:HttpClient) { }

  buscarPais(termino:string) : Observable<Country[]> {
    const url=`${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url,{params:this.httpParams});
  }

  buscarCapital(termino:string) : Observable<Country[]> {
    const url=`${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url,{params:this.httpParams});
  }

  getPaisPorCodigo(id:string) : Observable<Country> {
    const url=`${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }

  buscarRegion(id:string) : Observable<Country[]> {
    const url=`${this.apiUrlV2}/regionalbloc/${id}`;
    return this.http.get<Country[]>(url,{params:this.httpParams}).pipe(
      tap(console.log)
    );
  }

}
