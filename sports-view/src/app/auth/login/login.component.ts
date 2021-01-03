import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostsService,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
  });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    // use the rest service here.
    const auth = {
      // username: "mubak",
      email: this.f.email.value,
      password: this.f.password.value
    };

    this.authService.login(auth)
    .subscribe(res => {
      localStorage.setItem('token', res.key);
      this.router.navigate([this.returnUrl]);
      // this.toast.showSuccess('Great', 'login Successful');
      // this.getUser();
      console.log(res);
    }, err => {
      console.log(err);
      // this.toast.showError('Oops', 'Something went wrong during login');
      this.loading = false;
    });
  }

  // getUser(): void {
  //   this.restApi.user().subscribe(data => {
  //     localStorage.setItem('userId', data[0].id);
  //   });
  // }


}
