import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PatientPreview } from '../../features/recepcionist/patients/patients';

@Injectable({
    providedIn: 'root'
})
export class SelectedPatientConsultation {
    private selectedPatient = new BehaviorSubject<PatientPreview | null>(null);

    setPatientSelected(patient: PatientPreview | null): void {
        this.selectedPatient.next(patient);
    }

    getSelectedPatient(): Observable<PatientPreview | null> {
        return this.selectedPatient.asObservable();
    }
}
