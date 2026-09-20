import { Component } from '@angular/core';
import { CalendaryIcon } from '../../../svg/calendary-icon/calendary-icon';
import { getDateFormatted, date } from '../../../utils/date/date';
import { BadgesConsultation } from './components/badges-consultation/badges-consultation';

export interface Badge {
  text: string;
  colorBadge: string;
  colorText: string;
  quantity: number;
}

@Component({
  imports: [CalendaryIcon, BadgesConsultation],
  selector: 'app-agenda',
  templateUrl: './agenda.html',
})
export class Agenda {
  badges: Badge[] = [
    {
      text: 'Agendadas',
      colorBadge: 'var(--white-default)',
      colorText: 'var(--blue-dark)',
      quantity: 9
    },
    {
      text: 'Em espera',
      colorBadge: 'var(--blue-cian)',
      colorText: 'var(--white-default)',
      quantity: 2
    },
    {
      text: 'Atrasos',
      colorBadge: 'var(--red-light)',
      colorText: 'var(--black-default)',
      quantity: 1
    },
    {
      text: 'Concluídas',
      colorBadge: 'var(--green-default) ',
      colorText: 'var(--blue-dark)',
      quantity: 6
    }
  ]

  todayFormatted: string = getDateFormatted(date);


}
