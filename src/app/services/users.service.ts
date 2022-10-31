import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url= environment.usersUrl;

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get(this.url);
  }

  add(data: any){
    let oldUsers: any=localStorage.getItem('users');
    let newUsers=JSON.parse(oldUsers);
    newUsers.push(data);
    localStorage.setItem('users', JSON.stringify(newUsers));
  }

  delete(id: any){
    let oldUsers: any=localStorage.getItem('users');
    let newUsers=JSON.parse(oldUsers);
   let userTodelete=newUsers.find((user:any)=>user.id===id);
   let index=newUsers.indexOf(userTodelete);
    newUsers.splice(index,1)
    localStorage.setItem('users', JSON.stringify(newUsers));
  }
}
