import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: any = {
    username: '',
    password: ''
  }

  router = inject(Router);
  __sharedService = inject(SharedService);

  onSubmit() {
    if(this.loginObj.username ==="admin" && this.loginObj.password === "admin@123") {
      alert("Login Successful");
      this.__sharedService.login(this.loginObj.username);
      this.router.navigate(['/enquiry-list']);
    } else {
      alert("Please enter valid credentials");
    }
  }
}
