import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold">Venora UI (Skeleton)</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: false
})
export class AppComponent {}
