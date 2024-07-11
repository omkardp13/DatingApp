import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl=environment.apiUrl;


  currentUser=signal<User|null>(null);
  constructor(private http:HttpClient) { }

  login(model:any)
  {
       return this.http.post<User>(this.baseUrl+'account/login',model).pipe(
        map((response:User)=>
        {
          console.log("Response received:"+response);
          const user=response;
          if(user)
            {
              localStorage.setItem('user',JSON.stringify(user))
              console.log("response in login method"+user);
              this.currentUser.set(user);
           
            }
        })
      
       );
  }

  register(model:any)
  {
       return this.http.post<User>(this.baseUrl+'account/register',model).pipe(
        map((response:User)=>
        {
          const user=response;
          if(user)
            {
              localStorage.setItem('user',JSON.stringify(user))
              
            }
            return user;
        })
       );
  }

  

  logout()
  {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

}
