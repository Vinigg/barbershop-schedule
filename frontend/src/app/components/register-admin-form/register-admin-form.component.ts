import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { uniqueEmailValidator } from '../../shared/unique-email.directive';

@Component({
  selector: 'app-register-admin-form',
  imports: [NgIf, ReactiveFormsModule,InputTextModule,ButtonModule,RouterModule],
  templateUrl: './register-admin-form.component.html',
  styleUrl: './register-admin-form.component.css'
})
export class RegisterAdminFormComponent {
  registerAdminForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService ){
    this.registerAdminForm = this.fb.group({
      email:[
        '',
        [Validators.required, Validators.email],
        [uniqueEmailValidator(this.userService)]
      ],
      name:['', Validators.required],
      password:['', [Validators.required]],
      confirmPassword: ['',[Validators.required]]
    },{
      validators: passwordMatchValidator
    });
  }
  get email() {
    return this.registerAdminForm.get('email');
  }
  get name() {
    return this.registerAdminForm.get('name');
  }
  get password() {
    return this.registerAdminForm.get('password');
  }
  get confirmPassword() {
    return this.registerAdminForm.get('confirmPassword');
  }

  submitDetails(){
    const formValue = this.registerAdminForm.value;
    delete formValue.confirmPassword;

    const postData = {...formValue}

    this.userService.registerUser(postData as User).subscribe(
          response => {
            console.log(response)
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User successfully registered', life: 3000 });
          },
          error => {
            console.log(error)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });
          }

        )
  }

}
