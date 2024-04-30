import { NgClass } from '@angular/common';
import { Component, effect, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbCollapseModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { Check, GuiMode, Task } from '../../models/task.model';

@Component({
  selector: 'app-update-task-modal',
  standalone: true,
  imports: [
    MarkdownModule,
    FormsModule,
    NgbCollapseModule,
    NgClass,
    NgbNavModule,
  ],
  templateUrl: './update-task-modal.component.html',
  styleUrl: './update-task-modal.component.css',
})
export class UpdateTaskModalComponent {
  title = signal('');
  markdownContent = model('');
  task = signal<Task>({} as Task);
  editTitle = signal(false);
  activeModal = inject(NgbActiveModal);
  isCollapsed = true;
  guiMode = GuiMode;
  taskList = signal<Check[]>([]);
  constructor() {
    effect(
      () => {
        if (this.task()) {
          this.title.set(this.task().title);
          this.markdownContent.set(
            this.task().desc ||
              'The editor supports markdown with live preview so you can enhance your task description.',
          );
          this.taskList.set(this.task().checklist);
        }
      },
      { allowSignalWrites: true },
    );
  }
  updateTask() {
    this.task.update((task) => {
      task.title = this.title();
      task.desc = this.markdownContent();
      task.checklist = this.taskList();
      return task;
    });
    console.log(this.task());
    this.activeModal.close();
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

    this.taskList.update((taskList) => {
      taskList = [...taskList, check];
      return taskList;
    });
  }

  changeMode(check: Check) {
    check.mode = check.mode == GuiMode.edit ? GuiMode.view : GuiMode.edit;
  }

  removeChecklistItem(check: Check) {
    this.taskList.update((taskList) => {
      taskList = taskList.filter((item) => item !== check);
      return taskList;
    });
  }
}
