import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

   userForm = this.fb.group({
    id: [''],
    nom: [''],
    prenom: [''],
    pays: [''],
    ville: [''],
    codePostal: ['']
  })

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createUser(){
    const newUser: User = this.userForm.value
    this.userService.create(newUser).subscribe(
      () => {
        this.router.navigate(['users']);
      },
      (error) => {
        console.log("Error", error);
      }
    );
  }

}
