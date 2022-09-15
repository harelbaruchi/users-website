import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url= environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+ "/comment/add/", data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  update(data:any){
    return this.httpClient.patch(this.url+ "/comment/update/", data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
  
  getComment(){
    return this.httpClient.get(this.url+"/comment/get");
  }

  delete(id:any){
    return this.httpClient.delete(this.url+ "/comment/delete/" +id,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
  
}
