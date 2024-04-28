import { Component, inject, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../models/task.model';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  categoryTitle = signal('Test category');
  testTask: Task = {
    title: 'testTask',
    checklist: [],
  };
  tasks = [this.testTask];
  readonly #modalService = inject(NgbModal);
  openAddModal(task?: Task) {
    const modalRef = this.#modalService.open(AddTaskModalComponent);
    if (task) {
      modalRef.componentInstance.task.set(task);
    }
    modalRef.result.then(
      (savedTask) => {
        this.tasks.push(savedTask);
      },
      () => {
        // In case of dissmissal with cross click
      },
    );
  }
}
