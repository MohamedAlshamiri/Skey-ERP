import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SkeyInputComponent } from '../../shared/ui/input/input';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, SkeyInputComponent],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {}
