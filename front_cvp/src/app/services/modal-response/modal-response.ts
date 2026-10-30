import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalResponse {
    private isModalResponseOpening = new BehaviorSubject<boolean>(true);
    private title = new BehaviorSubject<string>("Cadastro de Paciente");
    private message = new BehaviorSubject<string>("Paciente cadastrado com sucesso!");
    private buttonLabel = new BehaviorSubject<string>("Concluir");
    private routeNavigate = new BehaviorSubject<string | null>(null);

    setModalResponseOpening(open: boolean): void {
        this.isModalResponseOpening.next(open);
    }

    getModalResponseOpening(): Observable<boolean> {
        return this.isModalResponseOpening.asObservable();
    }

    setTitle(newTitle: string): void {
        this.title.next(newTitle);
    }

    getTitle(): Observable<string> {
        return this.title.asObservable();
    }

    setMessage(newMessage: string): void {
        this.message.next(newMessage);
    }

    getMessage(): Observable<string> {
        return this.message.asObservable();
    }

    setButtonLabel(newLabel: string): void {
        this.buttonLabel.next(newLabel);
    }

    getButtonLabel(): Observable<string> {
        return this.buttonLabel.asObservable();
    }

    setRouteNavigate(newRoute: string | null) {
        this.routeNavigate.next(newRoute);
    }

    getRouteNavigate(): Observable<string | null> {
        return this.routeNavigate.asObservable();
    }

    constructorModalResponse(open: boolean, title: string, message: string, label: string, newRoute: string | null) {
        this.setModalResponseOpening(open);
        this.setTitle(title);
        this.setMessage(message);
        this.setButtonLabel(label);
        this.setRouteNavigate(newRoute);
    }
}
