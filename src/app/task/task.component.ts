import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models/task';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task;
  taskDetailForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(private service: TaskService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.taskDetailForm = this.formBuilder.group({
      description: [undefined, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.service.findAll().subscribe(
      (responseData: any) => {
        this.tasks = responseData;
      },
      (responseError) => {
        this.toastr.error('An error has occurred while trying to load the tasks');
        console.error('An error has occurred while trying to load the tasks',responseError
        );
      },
      () => {
        console.debug('>> This is just an example of the "complete" step of an observable subscribe.');
      }
    );
  }

  handleSelect(task: Task): void {
    this.selectedTask = task;
    this.taskDetailForm.patchValue({
      description: this.selectedTask.description,
    });
  }

  askDelete(task): void {
    Swal.fire({
      title: `Confirm action`,
      text: `Are you sure deleting this task?`,
      icon: 'warning',
      showCancelButton: true,
    }).then((shouldDelete) => {
      if (shouldDelete) {
        this.service.delete(task.id).subscribe(
          () => {
            this.toastr.success('Task deleted', 'Success');
          },
          (responseError) => {
            this.toastr.error('Error', 'An error has ocurred while trying to delete the Task');
            console.error('An error has occurred while trying to change the task status', responseError);
          },
          () => {
            this.loadTasks();
          }
        );
      } else {
        return false;
      }
    });
  }

  handleDoneChange(task: Task, newDoneValue: boolean): void {
    this.service.update({ ...task, done: newDoneValue }).subscribe(
      () => {
        this.toastr.success(`Status changed for Task ID ${task.id}`, 'Task updated');
      },
      (responseError) => {
        this.toastr.error('An error has occurred while trying to change the task status');
        console.error('An error has occurred while trying to change the task status', responseError);
      },
      () => {
        this.loadTasks();
      }
    );
  }

  handleSubmit() {
    this.formSubmitted = true;

    const modifiedTask: Task = {
      ...this.selectedTask,
      description: this.taskDetailForm.get('description').value,
    };

    this.service.update(modifiedTask).subscribe(
      () => {
        this.toastr.success('Task updated', 'Success');
        document.getElementById('closeModalBtn').click();
        this.selectedTask = undefined;
      },
      (responseError) => {
        this.toastr.error('An error has occurred while trying to change the task description');
        console.error('An error has occurred while trying to change the task description', responseError);
      },
      () => {
        this.loadTasks();
      }
    );
  }
}
