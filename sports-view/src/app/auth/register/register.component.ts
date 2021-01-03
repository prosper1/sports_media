import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private toast: ToastService,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [ Validators.required]],
      email: ['', [ Validators.required, Validators.email]],
      password1: ['', [ Validators.required]],
      password2: ['', [ Validators.required]],
  });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  onRegister(){

      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }

      this.loading = true;

      // use the rest service here.
      const auth = {
        username: this.f.username.value,
        email: this.f.email.value,
        password1: this.f.password1.value,
        password2: this.f.password2.value
      };

      this.authService.register(auth)
      .subscribe(res => {
        localStorage.setItem('token', res.key);
        // this.toast.showSuccess('Great', 'Successfully registered');
        this.router.navigate([this.returnUrl]);
        console.log(res);
      }, err => {
        console.log(err);
        this.loading = false;
        // this.toast.showError('Oops', 'Could not register');
      });
    }
}
