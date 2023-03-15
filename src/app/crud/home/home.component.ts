import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Users } from '../users';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent  implements OnInit {

  public users: Users[] = []


  constructor(private crudService: CrudService) {}


  ngOnInit(){
    this.getAllUsers()
  }


  public getAllUsers(){
    this.crudService.getUsers.subscribe( {
      next: res => this.users = res, 
      error: error => error
    })
  }

  public deleteUserFc(id: number){
    console.log(id)
    this.crudService.deleteUser(id).subscribe({
      next: res => this.getAllUsers(),
      error: error => error
    })
  }
}
