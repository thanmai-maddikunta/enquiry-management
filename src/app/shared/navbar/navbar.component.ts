import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private sharedService = inject(SharedService);

  isLoggedIn = this.sharedService.getIsLoggedIn();
  userName = this.sharedService.getUserName();

  closeNavbar(): void {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler') as HTMLElement;
      if (toggler) {
        toggler.click();
      }
    }
  }

  logout(): void {
    this.sharedService.logout();
  }
}
