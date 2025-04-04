import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface Profile {
  id: number,
  name: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private profiles: Profile[] = [
    { id: 1, name: 'Alice Dupont', email: 'alice@example.com' },
    { id: 2, name: 'Jean Martin', email: 'jean@example.com' },
    { id: 3, name: 'Claire Dubois', email: 'claire@example.com' }
  ];

  constructor() { }

  getProfiles(): Observable<Profile[]> {
    return of(this.profiles);
  }
}
