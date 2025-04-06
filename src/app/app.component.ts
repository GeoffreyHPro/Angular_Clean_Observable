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
    name: [''],
    email: ['']
  });

  profiles$: Observable<Profile[]> = this.getProfiles();

  constructor(private profileService: ProfilesService, private fb: FormBuilder) { }

  private getProfiles(): Observable<Profile[]> {
    const profiles$ = this.profileService.getProfiles();

    const search$ = combineLatest([
      this.search.controls.name.valueChanges.pipe(startWith('')),
      this.search.controls.email.valueChanges.pipe(startWith('')),
    ])

    return combineLatest([profiles$, search$]).pipe(
      map(([profiles, [name, email]]) => {
        const isNameMatching = profiles.filter(profile => profile.name.toLowerCase().includes(name.toLowerCase()));
        const isEmailMatching = profiles.filter(profile => profile.email.toLowerCase().includes(email.toLowerCase()));

        return isNameMatching && isEmailMatching
      })
    )
  }
}