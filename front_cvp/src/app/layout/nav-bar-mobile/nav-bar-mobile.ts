import { Component, inject } from '@angular/core';
import { NavBarIconData, Navigation } from '../../services/navigation/navigation';
import { NavBarIcon } from '../side-bar/components/nav-bar-icon/nav-bar-icon';


@Component({
  imports: [NavBarIcon],
  selector: 'app-nav-bar-mobile',
  templateUrl: './nav-bar-mobile.html',
})
export class NavBarMobile {
  private navigation = inject(Navigation);
  navBarIcons: NavBarIconData[] = this.navigation.getIconsNavBar();

  setIconActive(icon: string): void {
    this.navigation.setActiveIcon(icon);
  }
}
