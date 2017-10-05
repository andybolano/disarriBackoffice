import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService extends Http {
  
  constructor (backend: XHRBackend, options: RequestOptions) {    
    let token = localStorage.getItem('auth_token'); // your custom token getter function here
    options.headers.set('token', `Bearer ${token}`);
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('auth_token'); 
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {   
        // let's make option object 
        options = {headers: new Headers()};
      }
      options.headers.set('token', `${token}`); 
    } else {
    // we have to add the token to the url object 
      url.headers.set('token', `${token}`);
    } 
    return super.request(url, options).catch(this.catchAuthError(this)); 
  }

  private catchAuthError (self: HttpService) {
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        // if not authenticated   
        window.location.replace('/login');
      }

      if (res.status === 500) {
        // Internal Server Error
       // window.location.replace('/500');
      }
      return Observable.throw(res);
    };
  }
}