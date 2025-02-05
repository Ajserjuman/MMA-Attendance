import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


export interface userdata{
  username?: string;
  user_rid?: number;
  email_id?: string;
  staffId?: number;

}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';
  config: userdata = {};
  myConfig = new BehaviorSubject<userdata>(this.config);
  constructor(public c:HttpClient) { }

  fetchData()
  {
    return this.c.get('http://localhost:3000/fetch');
  }

  insertData(data: any) {
    console.log(data);
    return this.c.post(`${this.apiUrl}/insert`, data);
  }

  login(data:any)
  {
    console.log(data);
    return this.c.post(`${this.apiUrl}/login`, data);
  }

  signup(data:any)
  {
    console.log(data);
    return this.c.post(`${this.apiUrl}/signup`, data);
  }

  postData(data : any){
    console.log(data);
    this.c.post('http://localhost:3000/insert',data);
  }

}
