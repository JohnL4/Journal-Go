import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Option } from "./model/option";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private http: HttpClient,
  ) { }

  getThemeOptions(): Observable<Array<Option>> {
    return this.http.get<Array<Option>>("assets/options.json");
  }

  setTheme(themeToSet: string) {
    // TODO(@SiddAjmera): Implement this later
  }
}