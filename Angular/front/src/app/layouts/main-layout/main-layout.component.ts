import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SkeyInputComponent } from '../../shared/ui/input/input';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, SkeyInputComponent],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
