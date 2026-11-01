import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-add-patient-button',
  templateUrl: './add-patient-button.html',
})
export class AddPatientButton {
  private readonly router = inject(Router);

  addPatientRedirect(): void {
    this.router.navigate(['recepcionist/register_patient']);
  }
}
