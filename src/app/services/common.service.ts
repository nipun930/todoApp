import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {}

  addNew(obj): Observable<any>{
    let data = JSON.parse(localStorage.data);
    data.push(obj);
    localStorage.setItem('data', JSON.stringify(data));
    return of(data);
  }
  getAllData(): Observable<any>{
    let data = JSON.parse(localStorage.data);
    return of(data);
  }

  update(obj, index): Observable<any>{
    let data = JSON.parse(localStorage.data);
    data[index] = obj;
    localStorage.setItem('data', JSON.stringify(data));
    return of(data);
  }
  
  delete(index): Observable<any>{
    let data = JSON.parse(localStorage.data);
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    return of(data);
  }

  


}
