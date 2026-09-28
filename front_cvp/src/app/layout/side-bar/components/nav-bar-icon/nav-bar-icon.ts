import { NgComponentOutlet } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarIconData, Navigation } from '../../../../services/navigation/navigation';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [NgComponentOutlet, RouterLink],
  selector: 'app-nav-bar-icon',
  templateUrl: './nav-bar-icon.html',
})
export class NavBarIcon {
  private navigation = inject(Navigation);

  iconNavBar = input.required<NavBarIconData>();
  changeIconSelected = output<string>();
  iconSelected = toSignal(this.navigation.getActiveIcon(), { initialValue: '' })

  onClickIcon(icon: string): void {
    this.changeIconSelected.emit(icon);
  }
}
