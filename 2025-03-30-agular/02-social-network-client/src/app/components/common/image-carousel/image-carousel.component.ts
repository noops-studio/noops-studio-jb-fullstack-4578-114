import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carousel" *ngIf="images && images.length">
      <img [src]="images[currentIndex]" alt="Image {{ currentIndex + 1 }}">
      <button *ngIf="images.length > 1" (click)="prev()">Prev</button>
      <button *ngIf="images.length > 1" (click)="next()">Next</button>
    </div>
  `,
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent {
  @Input() images: string[] = [];
  currentIndex = 0;

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
