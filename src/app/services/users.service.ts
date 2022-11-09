import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = GlobalConstants.usersUrl;

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get('https://randomuser.me/api/?results=10');
  }

  add(data: any) {
    let oldUsers: any = localStorage.getItem('users');
    let newUsers = JSON.parse(oldUsers);
    newUsers.push(data);
    localStorage.setItem('users', JSON.stringify(newUsers));
  }

  update(data: any) {
    console.log(data);
    let oldUsers: any = localStorage.getItem('users');
    let usersToUpdate = JSON.parse(oldUsers);
    const indexToUpdate= usersToUpdate.findIndex((user:any)=> user.id === data.id);
    usersToUpdate[indexToUpdate]=data;
    localStorage.setItem('users', JSON.stringify(usersToUpdate)); 
  }

  delete(id: any) {
    let oldUsers: any = localStorage.getItem('users');
    let newUsers = JSON.parse(oldUsers);
    let userTodelete = newUsers.find((user: any) => user.id === id);
    let index = newUsers.indexOf(userTodelete);
    newUsers.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(newUsers));
  }
}
