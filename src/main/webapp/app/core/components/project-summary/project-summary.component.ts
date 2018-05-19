import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../entities/project';

@Component({
  selector: 'jhi-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-list.scss']
})
export class ProjectSummaryComponent implements OnInit {

    @Input() p: Project;

    constructor() { }

    ngOnInit() {

  }

}
