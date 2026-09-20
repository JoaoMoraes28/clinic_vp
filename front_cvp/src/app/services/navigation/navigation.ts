import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Navigation {
    private activeIcon = new BehaviorSubject<string>('Consultas');

    setActiveIcon(newIcon: string): void {
        this.activeIcon.next(newIcon);
    }

    getActiveIcon(): Observable<string> {
        return this.activeIcon.asObservable();
    }
}
