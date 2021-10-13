import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: number = 0;
  currentUser!: User;
  user!: User

  updateUserForm = this.fb.group({
    id: [''],
    nom: [''],
    prenom: [''],
    pays: [''],
    ville: [''],
    codePostal: ['']
  })

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getUser();
  }

  getUser(){
    this.userService.getById(this.id).subscribe(
      data => {
        this.user = data;
        this.updateUserForm.get('nom')?.setValue(this.user.nom);
        this.updateUserForm.get('prenom')?.setValue(this.user.prenom);
        this.updateUserForm.get('pays')?.setValue(this.user.pays);
        this.updateUserForm.get('ville')?.setValue(this.user.ville);
        this.updateUserForm.get('codePostal')?.setValue(this.user.codePostal);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  updateUser() {
    this.currentUser = this.updateUserForm.value;
    this.userService.update(this.id, this.currentUser).subscribe(
      () => {
        this.router.navigate(['users']);
        console.log(this.currentUser);
      },
      (error) => {
        console.log("Error", error);
      }
    )
  }

}
