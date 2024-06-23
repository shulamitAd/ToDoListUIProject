import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoItem } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  minDate = new Date(); // Today's date
  id:number = 0;

  constructor(private fb: FormBuilder, private todoService: TodoService,
    private router: Router, private route: ActivatedRoute) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      plannedDate: [null, [Validators.required, this.plannedDateValidator.bind(this)]]
    });
   }

   ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.id=+id;
          this.todoService.get(+id).subscribe({
            next: (item) => {
              this.todoForm.patchValue(item);
            },
          });
        }
      },
    });
  }
  update(item:ToDoItem) {
    this.todoService
      .update(this.id, item)
      .subscribe({
        next: (response) => {
          alert("item updated!");
          this.router.navigate(['todos']);
        },
        error: (error) => {
          alert("something went wrong");
          console.log(error);
        },
      });
  }

  plannedDateValidator(control: FormGroup): { [key: string]: boolean } | null {
    const plannedDate = control.value;
    if (!plannedDate || plannedDate < this.minDate) {
      return { plannedDateInvalid: true }; // Custom error key
    }
    return null;
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const todo: ToDoItem = {
        id: this.id,
        ...this.todoForm.value
      };
      if(this.id)
        this.update(todo);
      else
        this.addToDo(todo);
    }
  }

  addToDo(item:ToDoItem){
    this.todoService.add(item).subscribe({
      next: (item) => {
        alert("item added!");
        this.router.navigate(['todos']);
      },
      error: (response) => {
        alert("something went wrong");
        console.log(response);
      },
    });
  }
}
