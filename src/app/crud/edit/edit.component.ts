import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';

import { Users } from '../users';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent {

  public editUser: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(
    private formBuilder: FormBuilder, 
    private crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  public user: Users = {firstName: '', lastName: '', email: '', id:0}
  
  ngOnInit(){
    //console.log(typeof this.route.snapshot.paramMap.get('id'))
    this.user.id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0')
    this.crudService.getUserById(this.user.id).subscribe({
      next: res => {
        this.editUser.setValue({
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email
        })
      },
      error: err => err
    })
  }

  public submitFormEdit(){
    if(this.editUser.valid){
      this.crudService.editUser(this.user.id, this.editUser.value).subscribe({
        next: res => {
          console.log('user updated!')
          this.router.navigateByUrl('/users')
        }, 
        error: error => error
      })
    }
  }

}

