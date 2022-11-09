import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
// import { LoginComponent } from '../login/login.component';
// import { UserService } from '../services/user.service';
// import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {     //authenticating the user 
    this.router.navigate(['/projects/dashboard']);
  }

//   signupAction(){
//     const dialogConfig= new MatDialogConfig();
//     dialogConfig.width="550px";
//     this.dialog.open(SignupComponent, dialogConfig);
    
//   }
//   forgotPasswordAction(){
//     const dialogConfig= new MatDialogConfig();
//     dialogConfig.width="500px";
//     this.dialog.open(ForgotPasswordComponent,dialogConfig)
//   }
//   loginAction(){
// const dialogConfig= new MatDialogConfig();
// dialogConfig.width="500px";
// this.dialog.open(LoginComponent,dialogConfig);
//   }

}
