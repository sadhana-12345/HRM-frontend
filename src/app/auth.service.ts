import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = 'https://hrm-xt7t.onrender.com';

  constructor(private http: HttpClient) {}

  register(firstname: string, lastname:string, email: string, password: string, department: string, position:string,phonenumber:string) {
    return this.http.post(`${this.baseURL}/register`, { firstname, lastname, email, password, phonenumber });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseURL}/login`, { email, password }).pipe(
      // Store the token in local storage upon successful login
      tap((response: any) => {
        // Check if localStorage is defined before using it
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout() {
    // Clear the token from local storage upon logout
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  isLoggedIn(): boolean {
    // Check if localStorage is defined and if the token exists
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    } else {
      // If localStorage is not available, return false
      return false;
    }
  }
}
