import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() postData;
  @Input("data") modifiedName;
  form: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostsService,
    private router: Router,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      comment: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (localStorage.getItem('token') || localStorage.getItem('userId')) {
      const user = JSON.parse(localStorage.getItem('user'));
      const payload = {
        user: user.id,
        content: this.f.comment.value,
        post: this.postData
      }
      this.postService.addComments(payload).subscribe( res => {
        this.toast.success('success','comment posted');
        this.f.comment.setValue("");
      });
    }
    else {
      this.router.navigate(['login']);
    }
  }

}
