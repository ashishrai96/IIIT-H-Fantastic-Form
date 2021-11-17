import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-likert-scale',
  templateUrl: './form-likert-scale.component.html',
  styleUrls: ['./form-likert-scale.component.scss']
})
export class FormLikertScaleComponent implements OnInit {

  @Input() statements: string[] = [];
  @Input() choices: string[] = [];
  @Input() editMode: boolean = false;

  answer: string[] = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.answer.fill('', 0, this.statements.length-1);
  }

  onAnswerChange() {
    console.log(this.answer);
  }

  addChoices() {
    this.choices.push('');
    // this.choices = [ ...this.choices ];
  }

  addStatement() {
    this.statements.push('');
    // this.statements = [ ...this.statements ];
  }

  trackByFn = (index, item) => index
  
}
