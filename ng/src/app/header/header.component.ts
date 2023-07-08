import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { Option } from "../model/option";
import { ThemeService } from "../theme.service";
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
  @Input() mainSidenav: MatSidenav | undefined;
  hamburgerMenuIsActive = true;
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions()!;

  constructor(private readonly themeService: ThemeService
  ) { }

  ngOnInit() {
    // this.themeService.setTheme("deeppurple-amber");
  }

  hamburgerMenuToggle() {
    this.mainSidenav?.toggle();
    this.hamburgerMenuIsActive = ! this.hamburgerMenuIsActive;
  }

  themeChangeHandler(themeToSet: string) {
    this.themeService.setTheme(themeToSet);
  }
}