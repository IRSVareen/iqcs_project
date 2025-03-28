import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  resetPasswordForm: any = FormGroup
  userId: string | null = null;
  userNotFound: boolean = false;
  

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,
    private route: ActivatedRoute){
    this.resetPasswordForm = fb.group({
      userName : ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });
  }
  checkUser(){
    const userName = this.resetPasswordForm.get('userName')?.value;

    this.userService.getUsers().subscribe(
      (users)=>{
        const foundUser = users.find((user: any) => user.userName === userName)
        console.log(foundUser);

        if (foundUser) {
          this.userId = foundUser._id; 
          this.userNotFound = false;
          this.router.navigate([`/forgetpassword/${this.userId}`]);
        } else {
          this.userId = null;
          this.userNotFound = true;
        }
      },(error)=>{
        console.error(error);
        this.userId = null;
        this.userNotFound = true;
      }
    )
  }
  

  onSubmit() {
    if (!this.userId) {
      alert('User not found. Please enter a valid username.');
      return;
    }

    const password = this.resetPasswordForm.get('password')?.value;
    this.userService.updateUser(this.userId, { password }).subscribe(
      (data) => {
        alert('Password updated successfully');
        this.router.navigate(['/login'])
      },
      (err) => {
        console.error(err);
        alert('Error updating password');
      }
    );
    this.resetPasswordForm.reset();
  }
}
