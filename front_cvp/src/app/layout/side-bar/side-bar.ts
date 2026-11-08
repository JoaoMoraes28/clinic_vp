import { Component, inject, OnInit, signal } from '@angular/core';
import { NavBarIcon } from './components/nav-bar-icon/nav-bar-icon';
import { NavBarIconData, Navigation } from '../../services/navigation/navigation';
import { ProfilePerson } from '../../svg/profile-person/profile-person';

@Component({
  imports: [NavBarIcon, ProfilePerson],
  selector: 'app-side-bar',
  templateUrl: './side-bar.html',
})
export class SideBar implements OnInit {
  private navigation = inject(Navigation);
  accountName = signal<string>("Usuário");
  accountPhoto = signal<string | null>(null);

  navBarIcons: NavBarIconData[] = this.navigation.getIconsNavBar();

  setIconClick(icon: string): void {
    this.navigation.setActiveIcon(icon);
  }

  async getProfileUser(): Promise<void> {

  }

  ngOnInit(): void {
    const name: string | null = localStorage.getItem("accountName");
    const imageProfile: string | null = localStorage.getItem("accountPhoto");

    if (imageProfile != null && imageProfile != '') this.accountPhoto.set(imageProfile);
    if (name) this.accountName.set(name);
  }
}
