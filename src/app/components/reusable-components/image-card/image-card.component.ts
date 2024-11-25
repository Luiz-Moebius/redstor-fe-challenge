import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './image-card.component.html',
})
export class ImageCardComponent {

  url = input.required<any>();
  imageSrc = input.required<string>();
  alt = input.required<string>();

}
