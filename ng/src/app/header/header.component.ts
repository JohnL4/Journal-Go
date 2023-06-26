import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { Option } from "../model/option";
import { ThemeService } from "../theme.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions()!;

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.setTheme("deeppurple-amber");
  }

  themeChangeHandler(themeToSet: string) {
    this.themeService.setTheme(themeToSet);
  }
}