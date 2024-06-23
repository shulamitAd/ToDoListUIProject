import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoItem } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todos: ToDoItem[] = [];

  constructor(
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todoService.getAll().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  deleteItem(id: number) {
    let confirmResult = confirm("Are you sure you want to delete?");
    if(confirmResult){
      this.todoService.delete(id).subscribe({
        next: (response) => {
          let currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
            });
        }
      });
    }
  }
}
