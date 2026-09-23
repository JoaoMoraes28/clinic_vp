import { Component, inject, Type } from '@angular/core';
import { NavBarIcon } from './components/nav-bar-icon/nav-bar-icon';
import { NavBarIconData, Navigation } from '../../services/navigation/navigation';
import { ProfilePerson } from '../../svg/profile-person/profile-person';

@Component({
  imports: [NavBarIcon, ProfilePerson],
  selector: 'app-side-bar',
  templateUrl: './side-bar.html',
})
export class SideBar {
  private navigation = inject(Navigation);

  navBarIcons: NavBarIconData[] = this.navigation.getIconsNavBar();

  setIconClick(icon: string): void {
    this.navigation.setActiveIcon(icon);
  }
}
