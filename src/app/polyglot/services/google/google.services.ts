import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class GoogleService {
  constructor(private _http: HttpClient) {}

  translate(obj: GoogleObj) {
    // Note: replace public key with .env in localhost:4200 as this key only works while deployed to production
    let url = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyBOFBhPfLU6zbbRHjbL3W0zb2MyVy_WHFo";
    return this._http.post(url, obj);
  }
}

export class GoogleObj {
  switch: boolean = false;
  format: string = "text";
  q: string;
  source: string = "en";
  target: string = "es";
  result: string;
  voice0: object = null;
  voice1: object = null;
  voices: object[] = [];
}
