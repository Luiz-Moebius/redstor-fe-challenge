import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    RouterLink,
    MatButton
  ],
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {

}
