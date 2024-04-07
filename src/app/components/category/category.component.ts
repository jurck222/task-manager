import { Component, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  categoryTitle = signal('Test category');
}
