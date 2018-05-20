import { Component, OnInit } from '@angular/core';
import {Project} from '../../../entities/project';

@Component({
  selector: 'jhi-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit {

  project: Project;
  constructor() { }

  ngOnInit() {
      this.project = {
          'creationDate': '2018-05-20',
          'description': 'string',
          'id': 0,
          'name': 'string',
          'userExtras': [
              {
                  'description': 'string',
                  'id': 0,
                  'user': {
                      'activated': true,
                      'email': 'string',
                      'firstName': 'string',
                      'id': 0,
                      'langKey': 'string',
                      'lastName': 'string',
                      'login': 'string',
                  }
              }
          ]
      };
  }

}
