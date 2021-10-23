import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(
    private http: HttpClient,
  ) { }

  get(endPoint, headers?, httpOptions?) {

    let requestHeaders = new HttpHeaders()
    if(headers && typeof headers == "object") {
      requestHeaders = this.prepareHeaders(headers)
    }
    return new Observable((observer) => {
      this.http.get(endPoint, {headers: headers, params: httpOptions}).subscribe((reponse: any) => {
        observer.next(reponse)
      }, (error) => {
        console.error(error)
        observer.next(error)
      })
    })

  } 
  post(endPoint, params, headers?, httpOptions?) {
    let requestHeaders = new HttpHeaders()
    if(headers && typeof headers == "object") {
      requestHeaders = this.prepareHeaders(headers)
    }
    return new Observable((observer) => {
      this.http.post(endPoint, params, { headers: headers ,params:httpOptions}).subscribe((reponse: any) => {
        observer.next(reponse)
      }, (error) => {
        console.error(error)
        observer.next(error)
      })
    })
  }
  put(endPoint, headers?, httpOptions?) {
    let requestHeaders = new HttpHeaders()
    if(headers && typeof headers == "object") {
      requestHeaders = this.prepareHeaders(headers)
    }
    return new Observable((observer) => {
      this.http.put(endPoint, httpOptions, { headers: headers ,params:httpOptions}).subscribe((reponse: any) => {
        observer.next(reponse)
      }, (error) => {
        console.error(error)
        observer.next(error)
      })
    })
  }
  delete(endPoint, headers?, httpOptions?) {
    let requestHeaders = new HttpHeaders()
    if(headers && typeof headers == "object") {
      requestHeaders = this.prepareHeaders(headers)
    }
    return new Observable((observer) => {
      this.http.delete(endPoint, {headers: headers, params: httpOptions}).subscribe((reponse: any) => {
        observer.next(reponse)
      }, (error) => {
        console.error(error)
        observer.next(error)
      })
    })
  }

  prepareHeaders(headers) {
    let requestHeaders = new HttpHeaders();
    let keys = Object.keys(headers);
    keys.forEach((key) => {
      requestHeaders.set(key, headers[key])
    })

    console.log(keys)
    return requestHeaders;
  }

}
