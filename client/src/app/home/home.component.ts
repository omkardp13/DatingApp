import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpClient)
  {

  } 
  registerMode=false;
  users:any;

  ngOnInit(): void {
    this.getUsers();
    
  }
 
  cancelRegisterMode(event:boolean)
  {
       this.registerMode=event;
  }

  registerToggle()
  {
    this.registerMode = !this.registerMode
  }

  getUsers()
  {
    this.http.get('https://localhost:7079/api/users').subscribe({
      next: response => this.users=response,
      error: error => console.log(error),
      complete:() => console.log('Request has completed'+this.users)
    });  
  }

}
