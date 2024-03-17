import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  repeatPass : string = 'none';
  IsAccountCreated: boolean = false;
  DisplayMessage: string = '';

  constructor(private authService : AuthService){}

  registerForm = new FormGroup({
    firstName : new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]),
    lastName : new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]),
    email : new FormControl("", [Validators.required, Validators.email]),
    mobile : new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]*")]),
    gender : new FormControl("m", [Validators.required]),
    pwd : new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    rpwd : new FormControl("")
  });

 registerSubmitted() {
  if (this.PWD.value == this.RPWD.value) {
    console.log(this.registerForm.valid);
    this.repeatPass = 'none';

    const genderValue = this.registerForm.value.gender === 'm' ? true : false;

    const user = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      mobile: this.registerForm.value.mobile,
      gender: genderValue,
      pwd: this.registerForm.value.pwd
    };

    this.authService.registerUser(user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.IsAccountCreated = true;
        this.DisplayMessage = res.message;
      },
      error: (error: any) => {
        console.log(error);
        if (error.error.message === "User Already Exist") {
          this.DisplayMessage = error.error.message;
          this.IsAccountCreated = false;
        } else {
          this.IsAccountCreated = false;
          this.DisplayMessage = 'An error occurred while creating the user.';
        }
      }
    });
  } else {
    this.repeatPass = 'inline';
  }
}


  get FirstName(): FormControl{
    return this.registerForm.get("firstName") as FormControl;
  }
  get LastName(): FormControl{
    return this.registerForm.get("lastName") as FormControl;
  }
  get Email(): FormControl{
    return this.registerForm.get("email") as FormControl;
  }
  get Mobile(): FormControl{
    return this.registerForm.get("mobile") as FormControl;
  }
  get Gender(): FormControl{
    return this.registerForm.get("gender") as FormControl;
  }
  get PWD(): FormControl{
    return this.registerForm.get("pwd") as FormControl;
  }
  get RPWD(): FormControl{
    return this.registerForm.get("rpwd") as FormControl;
  }

}
