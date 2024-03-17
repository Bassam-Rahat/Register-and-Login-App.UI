import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  IsAccountCreated: boolean = false;
  DisplayMessage: string = '';

  constructor(private authService : AuthService, private router : Router){}

  loginForm = new FormGroup({
    email : new FormControl("", [Validators.required, Validators.email]),
    pwd : new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(15)])
  })

  get Email() : FormControl{
    return this.loginForm.get('email') as FormControl;
  }

  get PWD() : FormControl{
    return this.loginForm.get('pwd') as FormControl;
  }

  loginSubmitted(){
    console.log(this.loginForm);

    const user = {
      email: this.loginForm.value.email,
      pwd: this.loginForm.value.pwd
    };

    this.authService.loginUser(user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.IsAccountCreated = true;
        this.authService.setToken(res.token);
        // this.DisplayMessage = "Login Successfully";
        this.router.navigateByUrl('home');
      },
      error: (error: any) => {
        console.log(error);
        if (error.error.message === "Failure") {
          this.DisplayMessage = "Login Failed";
          this.IsAccountCreated = false;
        } 
      }
    });
  }

}
