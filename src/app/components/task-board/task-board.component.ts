import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
  imports: [CategoryComponent],
})
export class TaskBoardComponent {}
