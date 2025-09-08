import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  public set(name: string, value: string, expirationDate: Date): void {
    if (typeof document !== 'undefined') {
      const expires = 'expires=' + expirationDate.toUTCString();
      document.cookie = `${name}=${value};${expires};path=/`;
    }
  }

  public get(name: string): string {
    if (typeof document !== 'undefined') {
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookies = decodedCookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
          return cookie.substring(name.length + 1);
        }
      }
    }
    return '';
  }

  public delete(name: string): void {
    if (typeof document !== 'undefined') {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }

  public check(name: string): boolean {
    return this.get(name) !== '';
  }
}