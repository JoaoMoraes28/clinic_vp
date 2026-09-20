import { Component, computed, input } from '@angular/core';
import { Badge } from '../../agenda';

@Component({
  imports: [],
  selector: 'app-badges-consultation',
  templateUrl: './badges-consultation.html',
})
export class BadgesConsultation {
  badge = input.required<Badge>();
  textBadge = computed(() => `${this.badge().text}: ${this.badge().quantity}`);
}
