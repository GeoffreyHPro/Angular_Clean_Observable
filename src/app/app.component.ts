import { Component } from '@angular/core';
import { Profile, ProfilesService } from './services/profiles.service';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  search = this.fb.nonNullable.group({
    name: ['']
  });

  profiles$: Observable<Profile[]> = combineLatest([this.profileService.getProfiles(), this.search.controls.name.valueChanges.pipe(startWith(''))])
    .pipe(
      map(([profiles, name]) => profiles.filter(profile => profile.name.toLowerCase().includes(name.toLowerCase())))
    );

  constructor(private profileService: ProfilesService, private fb: FormBuilder) { }
}