import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  currentUser: User = {
    id: 0,
    nom: '',
    prenom: '',
    pays: '',
    ville: '',
    codePostal: ''
  };
  showDetails: boolean = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.refreshUsers$.subscribe(() => {
      this.getAllUsers();
    });
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data ;
      },
      error => {
        console.log(error);
      }
    )
  }

  getUser(id: number){
    this.userService.getById(id).subscribe(
      data => {
        this.currentUser = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
    this.showDetails = true;
  }

  deleteUser(id: number){
    this.users.splice(id, 1);
    this.userService.delete(id).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

}
