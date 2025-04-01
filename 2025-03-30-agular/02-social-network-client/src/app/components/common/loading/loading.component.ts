import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <ng-template [ngIf]="loading">
  <div class="text-center py-4">Loading...</div>
</ng-template>

  `,
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  @Input() isLoading = false;
  @Input() error: string | null = null;
  @Input() onRetry?: () => void;
}