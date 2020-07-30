import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  formGroup$: FormGroup;
  allData = [];
  updateIndex = null;

  constructor(
    private _commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.formGroup$ = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      completed: new FormControl(null, Validators.required),
      completedAt: new FormControl(null, Validators.required)
    });

    this.getData();
  }

  getData(){
    this._commonService.getAllData().subscribe(res => {
      this.allData = res;
    });
  }

  edit(obj, index) {
    this.formGroup$.patchValue({
      'title': obj.title,
      'description': obj.description,
      'completed': obj.completed,
      'completedAt': obj.completedAt
    });
    this.updateIndex = index;
  }

  delete(obj, index) {
    this._commonService.delete(index).subscribe(res => {
      this.allData = res;
     });
  }

  Submit() {
    if (this.updateIndex !== null) {
      this._commonService.update(this.formGroup$.value, this.updateIndex).subscribe(res => {
        this.allData = res;
        this.formGroup$.reset();
      });
      this.updateIndex = null;
    } else {
      this._commonService.addNew(this.formGroup$.value).subscribe(res => {
        this.allData = res;
        this.formGroup$.reset();
      });
    }
    
  }

}
