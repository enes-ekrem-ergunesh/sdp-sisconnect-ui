import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BasicHttpResponse} from "../../../interfaces/sis-connect/basic-http-response/basic-http-response";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {

  constructor(private http: HttpClient) { }

  getHelloWorld() {
    return this.http.get<BasicHttpResponse>(environment.sisConnectApiUrl);
  }
}