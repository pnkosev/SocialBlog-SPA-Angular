import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { Post } from 'src/app/components/shared/models/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  form;
  btn;
  @Input() post: Post;
  @Output() sumbitFormEmitter = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const title = this.post ? this.post.title : '';
    const content = this.post ? this.post.content : '';
    const imageUrl = this.post ? this.post.imageUrl : '';
    this.btn = this.post ? 'Edit' : 'Create';
    this.form = this.fb.group({
      title: [title, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_ ]{5,}$/)]],
      content: [content, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_,.:;"' ]{50,}$/)]],
      imageUrl: [imageUrl, [Validators.required, this.validateImageUrl]],
    });
  }

  validateImageUrl(frm: FormControl) {
    return (frm.value.length === 0 && !frm.touched)
      || ((frm.value.startsWith('http') || frm.value.startsWith('https'))
        && (frm.value.endsWith('png') || frm.value.endsWith('jpg') || frm.value.endsWith('jpeg'))) ? null : { invalidUrl: true };
  }

  submitPost() {
    this.sumbitFormEmitter.emit(this.form.value);
  }

  get f() {
    return this.form.controls;
  }
}
