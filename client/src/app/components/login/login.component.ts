import { Component } from '@angular/core';
import { FormGroup , FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any = FormGroup;
  userId: string | null = null;


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router){
    this.loginForm = this.fb.group({
      userName : ['', [Validators.required]],
      password : ['', [Validators.required]]
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log('formSubmitted');
      this.userService.loginUser(this.loginForm.value).subscribe(
        (data)=>{
          // console.log(data);
          if (data && data.userName && data._id) { 
            this.userId = data._id; 
            console.log(this.userId);
            this.router.navigate(['/home']);
          } else {
            console.error('User ID not found in response');
          }
        },(err)=>{
          console.log(err);
        }
      )
    }else{
      console.log('form is invalid');
    }
    this.loginForm.reset()
  }
}