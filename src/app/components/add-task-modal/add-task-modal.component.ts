import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbCollapseModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { Check, GuiMode, Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [
    MarkdownModule,
    FormsModule,
    NgbCollapseModule,
    NgClass,
    NgbNavModule,
  ],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.css',
})
export class AddTaskModalComponent {
  initialTask: Task = {
    title: 'New Task',
    checklist: [],
    desc: 'The editor supports markdown with live preview so you can engance your task description.',
  };
  task = signal<Task>(this.initialTask);
  editTitle = signal(false);
  activeModal = inject(NgbActiveModal);
  isCollapsed = true;
  guiMode = GuiMode;

  addTask() {
    this.activeModal.close(this.task());
  }

  toggleEditTitle() {
    this.editTitle.update((v) => !v);
  }

  addChecklistItem() {
    let check: Check = {
      value: 'New item',
      completed: false,
      mode: GuiMode.edit,
    };

    this.task.update((task) => {
      task.checklist = [...task.checklist, check];
      return task;
    });
  }

  changeMode(check: Check) {
    check.mode = check.mode == GuiMode.edit ? GuiMode.view : GuiMode.edit;
  }

  removeChecklistItem(check: Check) {
    this.task.update((task) => {
      task.checklist = task.checklist.filter((c) => c !== check);
      return task;
    });
  }
}
