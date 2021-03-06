import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  updateUser:FormGroup;
  user:User;

  constructor(private formBuilder:FormBuilder,private userService:UserService,private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
 
    this.updateUser=this.formBuilder.group({
      id: [],
      username: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',Validators.required]
    });

    const id=this.route.snapshot.paramMap.get("id")
    if(+id > 0){
      this.userService.getUserById(+id).subscribe(user => {
        this.updateUser.patchValue(user);
        this.user=user;
      });
    }

  }

  updateThisUser(){
    this.user.username=this.updateUser.controls.username.value;
    this.user.email=this.updateUser.controls.email.value;
    this.user.phone=this.updateUser.controls.phone.value;
    this.userService.updateUser(this.user).subscribe( u => {
      this.router.navigate(['/display-users']);
    });
  }

}
