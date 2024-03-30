import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BasicHttpResponse} from "../../../interfaces/sis-connect/basic-http-response/basic-http-response";
import {ConfigService} from "../../common/config/config.service";

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getHelloWorld() {
    return this.http.get<BasicHttpResponse>(this.configService.getApiUrl());
  }
}
