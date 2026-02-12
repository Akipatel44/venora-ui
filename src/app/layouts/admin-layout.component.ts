import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {}
