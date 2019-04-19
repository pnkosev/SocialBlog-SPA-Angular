import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Comment } from '../../../models/comment.model';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  form: FormGroup;
  msg: string;
  btnText: string;
  @Input() comment: Comment;
  @Output() submitFormEmitter = new EventEmitter();
  @Output() goBackEmitter = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const content = this.comment ? this.comment.content : '';
    this.msg = this.comment ? 'Edit' : 'Create';
    this.btnText = this.comment ? 'Edit' : 'Create';
    this.form = this.fb.group({
      content: [content, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  postComment() {
    if (this.form.valid) {
      this.submitFormEmitter.emit(this.form.value);
      this.form.reset();
      this.form.controls.content.setErrors(null);
    }
  }

  goBack() {
    this.goBackEmitter.emit();
  }

}
