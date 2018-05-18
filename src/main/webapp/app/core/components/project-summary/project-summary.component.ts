import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-project-summary',
  templateUrl: './project-summary.component.html',
  styles: ['.example-card {\n' +
  '  max-width: 400px;\n' +
  '}\n' +
  '\n' +
  '.example-header-image {\n' +
  '  background-image: url(\'https://material.angular.io/assets/img/examples/shiba1.jpg\');\n' +
  '  background-size: cover;\n' +
  '}']
})
export class ProjectSummaryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
