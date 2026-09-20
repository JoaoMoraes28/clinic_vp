import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-profile-person',
  templateUrl: './profile-person.html',
})
export class ProfilePerson { 
  colorIcon = input.required<string>();
  width = input.required<number>();
  height = input.required<number>();
}