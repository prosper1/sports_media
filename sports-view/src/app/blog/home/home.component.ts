import { PostsService } from './../../_services/posts.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   posts = [];

  constructor(
    private postService: PostsService,
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void{
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

}
