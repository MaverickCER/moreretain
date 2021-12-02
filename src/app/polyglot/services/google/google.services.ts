import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class GoogleService {
  constructor(private _http: HttpClient) {}

  translate(obj: GoogleObj, key: string) {
    let url = "https://translation.googleapis.com/language/translate/v2?key=";
    return this._http.post(url + key, obj);
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
