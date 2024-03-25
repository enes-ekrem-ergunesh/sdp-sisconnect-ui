import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Platform} from "@ionic/angular";
import {environment} from "../../../../environments/environment"; // change the path for dev/prod

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl!: string

  constructor(private http: HttpClient, public platform: Platform) {
    if (environment.production){
      // declare apiUrl for production environment
    }
    else {
      this.onDev()
    }
  }

  getApiUrl(){
    return this.apiUrl
  }

  onDev(){
    if (this.platform.is("android")) {
      this.apiUrl = environment.sisConnectApiExternalUrl
    } else {
      this.apiUrl = environment.sisConnectApiUrl
    }
  }
}
