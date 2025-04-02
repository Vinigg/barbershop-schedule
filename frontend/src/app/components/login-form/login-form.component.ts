import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  imports: [NgIf, ReactiveFormsModule,InputTextModule,ButtonModule,RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private userService: UserService, private router:Router, private messageService: MessageService){
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['', [Validators.required]]
    });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginUser(){
    const {email,password} = this.loginForm.value
    this.userService.getUserByEmail(email as string).subscribe(
      response =>{
        console.log(response)
        if(response && response[0].password === password){
          sessionStorage.setItem('email',email as string)
          this.router.navigate(['/home'])
        } else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credentials are invalid', life: 3000 });
        }
      },
      error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });
      }
    )

  }

}
