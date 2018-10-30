import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit, OnDestroy {

  constructor() { 
    let body: any = document.getElementById('mainBody');
    body.classList.add('body-bg');
  }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    let body: any = document.getElementById('mainBody');
    body.classList.remove('body-bg');
  }

}
