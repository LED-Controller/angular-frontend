import { Injectable } from '@angular/core';

const IP_KEY = 'ip-adress';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const PORT ='8080'

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.localStorage.clear();
  }
  saveIp(ip: string){
    window.localStorage.removeItem(IP_KEY)
    window.localStorage.setItem(IP_KEY, ip);
  }
  getIp(){
    const ipAdress: string | null = localStorage.getItem(IP_KEY);
    if (ipAdress != null) {
      return ipAdress;
    }
    return '';
  }
  getPort(){
    return PORT;
  }
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    const tokenKey: string | null = localStorage.getItem(TOKEN_KEY);
    if (tokenKey != null) {
      return tokenKey;
    }
    return '';
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const userKey: string | null = localStorage.getItem(USER_KEY);
    if (userKey != null) {
      return JSON.parse(userKey);
    }
    return '';
  }

  public isExpired(): boolean {
    const expiry: any = JSON.parse(atob(this.getToken().split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
