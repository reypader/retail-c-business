import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class BackendService {

  HOST: string = environment.HOST;
  ROOT: string = this.HOST + '/api/';
  baseUrls: ReplaySubject<Object> = new ReplaySubject<Object>();

  constructor(private http: HttpClient) {
    http.get(this.ROOT, {withCredentials: true}).subscribe(data => this.baseUrls.next(data));
  }

  getUrl(name: string): Observable<string> {
    console.log('Fetching base urls');
    return this.baseUrls.map(data => {
      return data[name];
    });
  }

  get<T>(url: string, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<T> {
    const s = url.split('?', 2);
    const u = this.normalize(s[0]);
    const p = this.addParams(s[1], params);
    console.log('Sending GET request to ' + u);
    return this.http.get<T>(u, {headers: headers, params: p, withCredentials: true});
  }

  delete<T>(url: string, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<T> {
    const s = url.split('?', 2);
    const u = this.normalize(s[0]);
    const p = this.addParams(s[1], params);
    console.log('Sending DELETE request to ' + u);
    return this.http.delete<T>(u, {headers: headers, params: p, withCredentials: true});
  }

  post<T>(url: string, body: Object, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<T> {
    const s = url.split('?', 2);
    const u = this.normalize(s[0]);
    const p = this.addParams(s[1], params);
    console.log('Sending POST request to ' + u);
    return this.http.post<T>(u, body, {headers: headers, params: p, withCredentials: true});
  }

  put<T>(url: string, body: Object, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<T> {
    const s = url.split('?', 2);
    const u = this.normalize(s[0]);
    const p = this.addParams(s[1], params);
    console.log('Sending PUT request to ' + u);
    return this.http.put<T>(u, body, {headers: headers, params: p, withCredentials: true});
  }

  patch<T>(url: string, body: Object, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<T> {
    const s = url.split('?', 2);
    const u = this.normalize(s[0]);
    const p = this.addParams(s[1], params);
    console.log('Sending PATCH request to ' + u);
    return this.http.patch<T>(u, body, {headers: headers, params: p, withCredentials: true});
  }

  private normalize(url: string): string {
    let u = url.replace(/([^:]\/)\/+/g, '$1');
    let n;
    if (u.lastIndexOf('/') === u.length - 1) {
      n = new URL(u);
    } else {
      n = new URL(u + '/');
    }

    if (this.HOST.length > 0) {
      return n.toString();
    } else {
      const s = n.protocol + '://' + n.host;
      return u.substr(s.length - 1);
    }
  }

  private addParams(q: string, params: HttpParams) {
    let z = params;
    if (q) {
      const p = q.split('&');
      for (const i of p) {
        const x = i.split('=');
        if (x[1]) {
          z = z.set(x[0], x[1]);
        }
      }
    }
    return z;
  }
}
