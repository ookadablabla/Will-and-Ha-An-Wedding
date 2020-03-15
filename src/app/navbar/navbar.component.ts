import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  validLanguages: string[] = ["en", "vi"];
  clientLanguage: string = (navigator.languages ? navigator.languages[0] : (navigator.language || (navigator as any).userLanguage)).substring(0,2);
  languageStyles: JQuery<HTMLElement>[] = [];

  constructor() { }

  ngOnInit() {

    //debug purposes - force a language
    this.clientLanguage = "vi"
    this.swapLanguage(this.clientLanguage);
  }

  swapLanguage(language: string) {
    let that = this;

    this.languageStyles.forEach(function(style) {
      style.remove();
    })

    this.validLanguages.forEach(function(lang) {
        if(lang !== language) {
          that.addStyleToHead($("<style>."+lang+" { display: none; }</style>"));
        }
    });

    //show the language, or default to english
    if(this.validLanguages.includes(language)) {
      that.addStyleToHead($("<style>."+language+" { display: inline-block; }</style>"));
    } else {
      that.addStyleToHead($("<style>.en { display: inline-block; }</style>"));
    }
  }

  addStyleToHead(style: JQuery<HTMLElement>) {
    this.languageStyles.push(style);
    $("head").append(style);
  }
}
