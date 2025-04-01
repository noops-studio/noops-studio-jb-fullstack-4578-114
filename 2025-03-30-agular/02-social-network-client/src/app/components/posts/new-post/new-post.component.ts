import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../services/profile.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  postForm: FormGroup;
  selectedFiles: File[] = [];
  error: string | null = null;
  loading = false;

  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private router: Router) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onFileChange(event: any) {
    if (event.target.files) {
      for (let file of event.target.files) {
        this.selectedFiles.push(file);
      }
    }
  }

  submitPost() {
    if (this.postForm.invalid) return;
    this.loading = true;
    const formData = new FormData();
    formData.append('title', this.postForm.get('title')?.value);
    formData.append('body', this.postForm.get('body')?.value);
    this.selectedFiles.forEach(file => formData.append('postImages', file));
    this.profileService.addPost(formData).subscribe({
      next: post => {
        this.loading = false;
        this.postForm.reset();
        this.selectedFiles = [];
        this.router.navigate(['/profile']);
      },
      error: err => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}