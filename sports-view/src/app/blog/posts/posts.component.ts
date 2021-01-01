import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;

  constructor(
    private router: Router,
    private postService: PostsService,
  ) { }

  ngOnInit(): void {
  }

  goto(id: any, name: any): void {
    const filteredPosts = this.posts.filter(post => post.id === id);
    const navigationExtras: NavigationExtras = {
      state: {
        post: filteredPosts
      }
    };
    this.router.navigate(['post-details', id], navigationExtras);
  }

  products(): void {
    this.postService.getPosts().subscribe(
      data => {
        this.posts = data;
      });
  }

}
