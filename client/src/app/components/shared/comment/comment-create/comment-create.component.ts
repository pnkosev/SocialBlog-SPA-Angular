import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  @Output() submitCommentEmitter = new EventEmitter();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    });
  }

  submitComment() {
    if (this.form.valid) {
      this.submitCommentEmitter.emit(this.form.value);
      this.form.reset();
    }
  }

  get f() {
    return this.form.controls;
  }
}
