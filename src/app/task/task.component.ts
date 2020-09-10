import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task;

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.service.findAll().subscribe(
      (responseData: any) => {
        console.log(responseData);
        this.tasks = responseData;
      },
      (responseError) => {
        alert('An error has occurred while trying to load the tasks');
        console.error('An error has occurred while trying to load the tasks', responseError);
      },
      () => {
        console.debug('>> This is just an example of the "complete" step of an observable subscribe.');
      }
    )
  }

  handleSelect(task: Task): void {
    this.selectedTask = task;
  }

  handleDoneChange(task, newDoneValue): void {
    this.service.update({ ...task, done: newDoneValue }).subscribe(
      (responseSuccess) => {},
      (responseError) => {
        alert('An error has occurred while trying to change the task status');
        console.error('An error has occurred while trying to change the task status', responseError);
      },
      () => {
        this.loadTasks();
      }
    );
  }
}
