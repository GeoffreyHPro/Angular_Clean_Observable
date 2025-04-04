import { Component } from '@angular/core';
import { Profile, ProfilesService } from './services/profiles.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  profiles$: Observable<Profile[]> = this.profileService.getProfiles();

  constructor(private profileService: ProfilesService){}
}