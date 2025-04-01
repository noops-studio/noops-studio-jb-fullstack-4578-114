import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import Post from '../../../models/post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnChanges {
  @Input() post!: Post;
  @Output() save = new EventEmitter<{ id: string, data: any }>();
  @Output() cancel = new EventEmitter<void>();

  editForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnChanges(): void {
    if (this.post) {
      this.editForm.patchValue({
        title: this.post.title,
        body: this.post.body
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  onSave() {
    if (this.editForm.invalid) return;
    const data = this.editForm.value;
    this.save.emit({ id: this.post.id, data });
  }

  onCancel() {
    this.cancel.emit();
  }
}