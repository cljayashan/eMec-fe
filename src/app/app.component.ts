import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { SideNavComponent } from './ui/components/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIcon, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'eMec-fe';
  isSideNavOpen = true;

  constructor(private router: Router) {}

  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }
}
