import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-ui-textarea',
  templateUrl: './ui-textarea.component.html',
  styleUrls: ['./ui-textarea.component.scss']
})
export class UiTextareaComponent implements OnInit {
    @Input() placeholder: string|null = "";
    @Input() inputName: string|null;
    @Input() inputInfo: string|null;
    @Input() isSubmitted: boolean = false;
    @Input() isInputDisabled: boolean = false;
    @Input("fc") set s(value: FormControl){
      this.fc = value;
    }
    fc: FormControl = new FormControl();
    @Input() errorDictionary: { [key: string]: string } = {};
    @Input() serverErrorDictionary: { [key: string]: string } = {};
  constructor() { }

  ngOnInit(): void {
  }

  get isFormControlInvalid() {
    return this.fc.dirty && !this.fc.valid && this.fc.touched;
  }
 
  get isFormSubmittedWithNoErrors() {
 
    return !this.isSubmitted && this.fc.errors == null;
  }
  get isControlPistine() {
    return !this.fc.value && this.fc.pristine;
  }
  get returnErrorMsg() {
    return this.errorDictionary[
      Object.keys(this.fc.errors as ValidationErrors)[0]
    ]; 
  }

    
  get serverErrorDictionaryKeys() {
    return Object.keys(this.serverErrorDictionary)
  }

}
