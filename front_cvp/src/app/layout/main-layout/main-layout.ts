import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideBar } from '../side-bar/side-bar';
import { NavBarMobile } from '../nav-bar-mobile/nav-bar-mobile';
import { ResponseMessage } from '../response-message/response-message';
import { LoadingResponse } from '../loading-response/loading-response/loading-response';
import { filter } from 'rxjs';
import { Navigation } from '../../services/navigation/navigation';

@Component({
  imports: [RouterOutlet, SideBar, NavBarMobile, ResponseMessage, LoadingResponse],
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
})
export class MainLayout implements OnInit {
  private readonly serviceNavigationIcons = inject(Navigation);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.serviceNavigationIcons.setActiveIcon(this.router.url)

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.serviceNavigationIcons.setActiveIcon(event.urlAfterRedirects);
    }
    )

  }
}
