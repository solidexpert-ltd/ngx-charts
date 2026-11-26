import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, MatIcon],
  templateUrl: './landing.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './landing.component.css',
})
export class LandingComponent {}
