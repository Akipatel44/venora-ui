import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-demo-admin',
  template: `
    <div class="p-4">
      <h2 class="text-xl font-semibold">Admin Demo</h2>
      <button class="mt-2 px-3 py-1 bg-blue-600 text-white" (click)="callProtected()">Call Protected API</button>
      <pre class="mt-4 bg-gray-100 p-3 rounded">{{result | json}}</pre>
    </div>
  `
})
export class DemoAdminComponent {
  result: any = null;
  constructor(private http: HttpClient) {}

  callProtected() {
    const token = (window as any).__env_token || localStorage.getItem('access_token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.get('http://localhost:8000/admin/protected', { headers }).subscribe(
      r => (this.result = r),
      e => (this.result = e.error || e)
    );
  }
}
