import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";

@Injectable()
export class BackendService {

  HOST: string = "http://127.0.0.1:8000";
  ROOT: string = this.HOST + "/api/"
  baseUrls: ReplaySubject<Object> = new ReplaySubject<Object>();

  constructor(private http: HttpClient) {
    http.get(this.ROOT).subscribe(data=> this.baseUrls.next(data));
  }

  getUrl(name: string): Observable<string> {
    console.log("Fetching base urls");
    return this.baseUrls.map(data=> {
      return data[name];
    });
  }

  get<T>(url: string, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<T> {
    const s = url.split("?", 2);
    const u = this.normalize(s[0]);
    const p = this.addParams(s[1], params);
    console.log("Sending GET request to " + u);
    return this.http.get<T>(u, {headers: headers, params: p, withCredentials: true});
  }

  delete<T>(url: string, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<T> {
    const s = url.split("?", 2);
    const u = this.normalize(s[0]);
    const p = this.addParams(s[1], params);
    console.log("Sending DELETE request to " + u);
    return this.http.delete<T>(u, {headers: headers, params: p, withCredentials: true});
  }

  post<T>(url: string, body: Object, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<T> {
    const s = url.split("?", 2);
    const u = this.normalize(s[0]);
    const p = this.addParams(s[1], params);
    console.log("Sending POST request to " + u);
    return this.http.post<T>(u, body, {headers: headers, params: p, withCredentials: true});
  }

  put<T>(url: string, body: Object, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<T> {
    const s = url.split("?", 2);
    const u = this.normalize(s[0]);
    const p = this.addParams(s[1], params);
    console.log("Sending PUTT request to " + u);
    return this.http.put<T>(u, body, {headers: headers, params: p, withCredentials: true});
  }

  private normalize(url: string): string {
    let u = url.replace(/([^:]\/)\/+/g, "$1");
    // if(u.lastIndexOf(this.HOST) == 0){
    //   u = u.substr(this.HOST.length);
    // }
    if (u.lastIndexOf("/") == u.length - 1) {
      return u;
    } else {
      return u + "/";
    }
  }

  private addParams(q: string, params: HttpParams) {
    let z = params;
    if (q) {
      const p = q.split("&");
      for (let i of p) {
        let x = i.split("=")
        if (x[1]) {
          z = z.set(x[0], x[1]);
        }
      }
    }
    return z;
  }
}
