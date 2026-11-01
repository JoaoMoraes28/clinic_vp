import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../side-bar/side-bar';
import { NavBarMobile } from '../nav-bar-mobile/nav-bar-mobile';
import { ResponseMessage } from '../response-message/response-message';
import { LoadingResponse } from '../loading-response/loading-response/loading-response';

@Component({
  imports: [RouterOutlet, SideBar, NavBarMobile, ResponseMessage, LoadingResponse],
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
})
export class MainLayout {}
