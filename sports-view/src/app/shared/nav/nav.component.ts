import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  notLoggedIn = true;
  constructor(
    
  ) { }

  ngOnInit(): void {
    this.notLoggedIn = this.checkLogin();
  }

  checkLogin(): boolean {
    if (localStorage.getItem('token') != null) {
      return false;
    }
    return true;
  }

}
