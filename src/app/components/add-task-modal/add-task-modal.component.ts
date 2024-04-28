import { Component, effect, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [MarkdownModule, FormsModule, NgbCollapseModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.css',
})
export class AddTaskModalComponent {
  initialTask: Task = {
    title: 'New Task',
    checklist: [],
  };
  task = signal<Task>(this.initialTask);
  markdownContent = model('Task description...');
  activeModal = inject(NgbActiveModal);
  isCollapsed = true;

  constructor() {
    effect(
      () => {
        if (this.task()) {
          this.markdownContent.set(this.task().desc || '');
        }
      },
      { allowSignalWrites: true },
    );
  }

  addTask() {
    this.task.update((task) => {
      task.desc = this.markdownContent();
      return task;
    });
    console.log(this.task());
    this.activeModal.close(this.task());
  }
}
