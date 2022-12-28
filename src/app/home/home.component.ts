import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GeneralService } from '../services/general.service';
import { ResponseModel } from '../models/general.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  console: Console;
  form: FormGroup;
  checkForm: FormGroup;
  isFormValid: boolean = true;
  nextPage: boolean = false;
  response = [];
  constructor(
    private fb: FormBuilder,
    private db: GeneralService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', Validators.required],
      org: [''],
      euResident: ['', Validators.required],
      fieldName: ['']
    })
    this.checkForm = this.fb.group({
      Advances: [true],
        Alerts: [false],
        Other: [false]
    })
    this.checkForm.valueChanges.subscribe(() => {
      if(this.checkForm.get('Advances').value || this.checkForm.get('Alerts').value || this.checkForm.get('Other').value){
        this.isFormValid = true;
      }
      else{
        this.isFormValid = false;
      }
    })
  }

  reset() {
    this.form.reset();
    this.checkForm.reset();
    this.checkForm.get('Advances').setValue(false); this.checkForm.get('Alerts').setValue(false); this.checkForm.get('Other').setValue(false);
  }

  submit(){
    this.form.get('fieldName').setValue(this.checkForm.value);
    console.log(encodeURI(JSON.stringify(this.form.value)))
     let service: Observable<any>
     service = this.db.postForm(encodeURI(JSON.stringify(this.form.value)))
    service.subscribe(response => {
      this.nextPage = true;
      this.db.getSuccess().subscribe(responseStatus => {
        this.response = responseStatus
      })
    }, (err) => {
      this.db.getError().subscribe(responseStatus => this.response = responseStatus)
      this.nextPage = true;
    })
  }
}

