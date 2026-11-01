import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingMessage {
    private isModalLoadingOPening = new BehaviorSubject<boolean>(false);

    setModalLoadingOpening(value: boolean): void {
        this.isModalLoadingOPening.next(value);
    }

    getModalLoadingOpening(): Observable<boolean> {
        return this.isModalLoadingOPening.asObservable();
    }
}
