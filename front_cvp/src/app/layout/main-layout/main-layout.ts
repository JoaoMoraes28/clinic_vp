import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../side-bar/side-bar';
import { NavBarMobile } from '../nav-bar-mobile/nav-bar-mobile';

@Component({
  imports: [RouterOutlet, SideBar, NavBarMobile],
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
})
export class MainLayout {}
