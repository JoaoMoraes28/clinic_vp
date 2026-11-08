import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LabelDatas } from '../../shared/data-label/data-label';
import { getDateFormatted, formattedHour } from '../../utils/date-hour';

@Injectable({
    providedIn: 'root'
})
export class ConsultationSelected {
    private consultationSelected = new BehaviorSubject<LabelDatas[]>([
        {
            label: 'Paciente',
            value: ''
        },
        {
            label: 'CPF',
            value: ''
        },
        {
            label: 'Telefone',
            value: ''
        },
        {
            label: 'Especialidade',
            value: ''
        },
        {
            label: 'Doutor(a)',
            value: ''
        },
        {
            label: 'Data',
            value: getDateFormatted(new Date('1000-10-10'))
        },
        {
            label: 'Horário',
            value: formattedHour('00:00:00')
        }
    ]);
    private openConsultationModal = new BehaviorSubject<boolean>(false);
    private idConsultationSelected = new BehaviorSubject<number>(0);

    setIdConsultationSelected(id: number) {
        this.idConsultationSelected.next(id);
    }

    getIdConsultationSelected(): Observable<number> {
        return this.idConsultationSelected.asObservable();
    }

    setConsultationSelected(datas: LabelDatas[]) {
        this.consultationSelected.next(datas);
    }

    getConsultationSelected(): Observable<LabelDatas[]> {
        return this.consultationSelected.asObservable();
    }

    setConsultationModal(open: boolean) {
        this.openConsultationModal.next(open);
    }

    getConsultationModal(): Observable<boolean> {
        return this.openConsultationModal.asObservable();
    }
}
