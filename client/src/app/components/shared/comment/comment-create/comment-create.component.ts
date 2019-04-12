import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  form;
  @Output() submitCommentEmitter = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_,.:;"' ]{10,}$/)]],
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
