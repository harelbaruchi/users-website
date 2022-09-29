import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data: any){
    return this.httpClient.post(this.url+ '/joke/add/', data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  update(){}

  getJokes(){
    return this.httpClient.get(this.url+ '/joke/get/')
  }

  getRelatedJokes(data: any){
    return this.httpClient.get(this.url+ `/joke/getByType/${data}`)
  }
}
