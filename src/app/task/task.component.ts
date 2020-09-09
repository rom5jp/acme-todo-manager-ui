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

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.service.findAll().subscribe(
      (responseData: any) => {
        console.log(responseData);
        this.tasks = responseData;
      },
      (responseError) => {
        console.error(responseError);
      },
      () => {
        console.debug('>> Task.findAll().complete');
      }
    )
  }

}
