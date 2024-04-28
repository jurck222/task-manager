import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import { CategoryComponent } from './components/category/category.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, CategoryComponent, AddTaskModalComponent],
})
export class AppComponent {
  title = 'frontend';
}
