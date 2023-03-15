import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent {

  public createUser: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(
    private formBuilder: FormBuilder, 
    private crudService: CrudService,
    private router: Router
  ){}

  public submitForm(){
    if(this.createUser.valid){
      this.crudService.create(this.createUser.value ).subscribe({
        next: res => {
          console.log('user created!')
          this.router.navigateByUrl('/users')
        }, 
        error: error => error
      })
    }
  }

}


