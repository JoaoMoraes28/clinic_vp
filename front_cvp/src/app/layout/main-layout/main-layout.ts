import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../side-bar/side-bar';

@Component({
  imports: [RouterOutlet, SideBar],
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
})
export class MainLayout {}
