import { Component, ElementRef, inject, OnInit, Renderer2, signal, viewChild, viewChildren } from '@angular/core';
import { date } from '../../../utils/date-hour';
import { BadgesConsultation } from './components/badges-consultation/badges-consultation';
import { ConsultationsTable } from './components/consultations-table/consultations-table';
import { Arrow } from '../../../svg/arrow/arrow';
import { LocationBall } from './components/location-ball/location-ball';
import { ConsultationPreview } from '../consultation/consultation-modal/consultation-preview';
import { desactiveScroll } from '../../../utils/renderer-document';
import { Consultation, ConsultationResponsePreview, ResumeConsultations } from '../../../repo/consultation/consultation';
import { ValideResponseApi } from '../../../services/valide-response/valide-response-api';
import { OutputLoading } from '../../../layout/loading-response/components/output-loading/output-loading';
import { HttpErrorResponse } from '@angular/common/http';
import { ConsultationSelected } from '../../../services/consultation-selected/consultation-selected';
import { toSignal } from '@angular/core/rxjs-interop';
import { format } from 'date-fns';

export interface Badge {
  text: string;
  colorBadge: string;
  colorText: string;
  quantity: number;
}

@Component({
  imports: [BadgesConsultation, ConsultationsTable, Arrow, LocationBall, ConsultationPreview, OutputLoading],
  selector: 'app-agenda',
  templateUrl: './agenda.html',
})
export class Agenda implements OnInit {
  private readonly serviceConsultation = inject(Consultation);
  private readonly serviceValide = inject(ValideResponseApi);
  private readonly serviceConsultationSelected = inject(ConsultationSelected);

  idConsultationSelected = toSignal(this.serviceConsultationSelected.getConsultationSelected());

  isLoadingConsultations = signal<boolean>(false);

  consultationsPreviewData = signal<ConsultationResponsePreview[]>([]);

  badges = signal<Badge[]>([
    {
      text: 'Agendadas',
      colorBadge: 'var(--blue-dark)',
      colorText: 'var(--white-default)',
      quantity: 0
    },
    {
      text: 'Em espera',
      colorBadge: 'var(--blue-cian)',
      colorText: 'var(--white-default)',
      quantity: 0
    },
    {
      text: 'Canceladas',
      colorBadge: 'var(--red-light)',
      colorText: 'var(--black-default)',
      quantity: 0
    },
    {
      text: 'Concluídas',
      colorBadge: 'var(--green-default) ',
      colorText: 'var(--blue-dark)',
      quantity: 0
    }
  ]);

  todayFormatted = () => { return format(date, "yyyy-MM-dd") }

  private carousel = viewChild<ElementRef<HTMLUListElement>>('containerCarousel');
  consultationsTables = viewChildren<ElementRef>('consultationTable');
  consultation = viewChild<ElementRef<HTMLLIElement>>('consultation');

  carouselElement: HTMLUListElement | undefined;
  consultationWidth: number | undefined;

  isModalConsultationOpen = toSignal(this.serviceConsultationSelected.getConsultationModal(), { initialValue: false });
  renderer = inject(Renderer2);

  async changeViewModalConsultation(): Promise<void> {
    desactiveScroll(this.isModalConsultationOpen(), this.renderer)

    this.serviceConsultationSelected.setConsultationModal(!this.isModalConsultationOpen());
  }

  rollCarousel(direction: 'left' | 'right'): void {
    this.carouselElement = this.carousel()?.nativeElement;
    this.consultationWidth = this.consultation()?.nativeElement.offsetWidth;

    if (!this.carouselElement || !this.consultationWidth) return


    if (direction == 'right') this.carouselElement!.scrollLeft += this.consultationWidth
    else this.carouselElement.scrollLeft -= this.consultationWidth
  }

  rollCarouselByLocationBall(index: number): void {
    this.consultationWidth = this.consultation()?.nativeElement.offsetWidth;
    this.carouselElement = this.carousel()?.nativeElement;

    this.carouselElement?.scrollTo({
      left: this.consultationWidth! * (index - 0.75),
      behavior: 'smooth'
    })

  }

  getHourNumber(hour: string): number {
    const number: number = Number(hour.split(':')[0])

    return number
  }

  async ngOnInit(): Promise<void> {
    await this.updateConsultationAndResume(this.todayFormatted());
  }

  async updateConsultationAndResume(date: string) {
    await this.getResumeConsultation(date);
    await this.getConsultations(date);
  }

  async getResumeConsultation(date: string): Promise<void> {
    const response: ResumeConsultations | HttpErrorResponse | false = await this.serviceConsultation.getCountConsultations(date);

    const isValid: boolean = await this.serviceValide.valideResponse(response, "Busca de Resumo de Consultas");

    if (!(response instanceof HttpErrorResponse) && response && isValid) {
      this.badges.set([

        {
          text: 'Agendadas',
          colorBadge: 'var(--blue-dark)',
          colorText: 'var(--white-default)',
          quantity: response.scheduled
        },
        {
          text: 'Em espera',
          colorBadge: 'var(--blue-cian)',
          colorText: 'var(--white-default)',
          quantity: response.waiting
        },
        {
          text: 'Canceladas',
          colorBadge: 'var(--red-light)',
          colorText: 'var(--black-default)',
          quantity: response.canceled
        },
        {
          text: 'Concluídas',
          colorBadge: 'var(--green-default) ',
          colorText: 'var(--blue-dark)',
          quantity: response.completed
        }
      ])
    }
  }

  async getConsultations(date: string): Promise<void> {
    this.isLoadingConsultations.set(false);

    const response: ConsultationResponsePreview[] | unknown = await this.serviceConsultation.getConsultationPreview(date);

    if (Array.isArray(response)) {
      this.consultationsPreviewData.set(response);
      this.isLoadingConsultations.set(true);
      return;
    }

    this.isLoadingConsultations.set(true);

    await this.serviceValide.valideResponse(response, "Busca de Consultas");
  }
}
