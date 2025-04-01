import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: any = FormGroup;
  roles: string[] = ['manager', 'operator', 'quality control engineer'];
  
  // ngOnInit(): void {
  //   this.userService.getUsers().subscribe(
  //     (data)=>{
  //       // console.log(data);
  //       console.log(data);
  //     },(err)=>{
  //       console.log(err);
  //     }
  //   )
  // }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private snackBar: MatSnackBar){
    this.registerForm = this.fb.group({
      userName : ['', [Validators.required, Validators.minLength(3)]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required, this.roleValidator]] 
    })
  }

  roleValidator(control: AbstractControl) {
    const validRoles = ['manager', 'operator', 'quality control engineer'];
    return validRoles.includes(control.value) ? null : { invalidRole: true };
  }
  
  onSubmit(){
    if(this.registerForm.valid){
      console.log('formSubmitted');
      this.userService.addUsers(this.registerForm.value).subscribe(
        (data)=>{
          console.log(data);
        },(err)=>{
          // console.log(err);
          console.log(err.error.msg);
          if (err.error.msg === 'User already exists') {
            alert('User Name Already Taken')
          }
        }
      )
      const snackBarConfig: MatSnackBarConfig = {
        duration: 3000,  
        horizontalPosition: 'center',  
        verticalPosition: "top", 
        panelClass: 'snackbar-style'
      };
      this.snackBar.open('Resgisteration successful!', 'Close', snackBarConfig);
      this.router.navigate(['/home'])
    }else{
      console.log('form is invalid');
    }
    this.registerForm.reset()
  }
  
}
