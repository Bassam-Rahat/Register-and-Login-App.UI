import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

currentUser : BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http : HttpClient) { }

  baseUrl = "https://localhost:7036/api/Users/"
  jwtHelperService = new JwtHelperService();

  registerUser(user : any) {
    return this.http.post(this.baseUrl + "CreateUser", user);
  }

  loginUser(user : any) {
    return this.http.post(this.baseUrl + "login", user);
  }

  setToken(token: string){
    localStorage.setItem("access_token", token);
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;

    const data = userInfo ? {
      email: userInfo.email,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      gender: userInfo.gender,
      mobile: userInfo.mobile,
      userId: userInfo.nameid,
      role: userInfo.role
    } : null;
    this.currentUser.next(data);
  }


  IsLoggedIn(): boolean{
    return localStorage.getItem("access_token") ? true : false;
  }

  RemoveToken(){
    localStorage.removeItem("access_token");
  }
}