import { PostsService } from './../../_services/posts.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts = [];

  constructor(
    private postService: PostsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void{
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

  goto(id: any): void {
    const filteredPosts = this.posts.filter(post => post.id === id);
    const navigationExtras: NavigationExtras = {
      state: {
        post: filteredPosts
      }
    };
    this.router.navigate(['posts/view/', id], navigationExtras);
  }

}
