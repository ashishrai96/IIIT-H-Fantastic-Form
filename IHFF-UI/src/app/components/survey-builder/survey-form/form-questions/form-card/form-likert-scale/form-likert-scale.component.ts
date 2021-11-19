import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const LIKERT_SCALE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormLikertScaleComponent),
  multi: true
};

@Component({
  selector: 'app-form-likert-scale',
  templateUrl: './form-likert-scale.component.html',
  styleUrls: ['./form-likert-scale.component.scss'],
  providers: [LIKERT_SCALE_VALUE_ACCESSOR]
})
export class FormLikertScaleComponent implements OnInit, ControlValueAccessor {

  @Input() statements: string[] = [];
  @Input() choices: string[] = [];
  @Input() editMode: boolean = false;
  @Input() readonly: boolean = false;
  // @Output() onAnswer = new EventEmitter<string[]>();

  answer: string[] = new Array(this.statements.length).fill('');

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges() {
    // console.log(this.answer, "here here");
    
  }

  ngOnInit(): void {
    setTimeout(() => { this.answer = new Array(this.statements.length).fill(''); }, 0);
  }

  onAnswerChange() {
    // console.log(this.answer);
    this.onChange(this.answer);
  }

  addChoices() {
    this.choices.push('');
    // this.choices = [ ...this.choices ];
  }

  addStatement() {
    this.statements.push('');
    // this.statements = [ ...this.statements ];
  }

  trackByFn = (index, item) => index;



  writeValue(obj: any): void {
    console.log("it writes----------", obj);
    if(obj){
      this.answer = obj;
      setTimeout(() => { this.answer = [ ...obj ]; }, 0);
      this.onChange(obj);
    }
  }

  onTouch = ()=>{}
  onChange = (_) => {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  
}
