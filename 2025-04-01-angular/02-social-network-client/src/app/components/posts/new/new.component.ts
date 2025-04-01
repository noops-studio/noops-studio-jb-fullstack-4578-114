import { Component, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Draft } from '../../../models/post/draft.model';
import { ProfileService } from '../../../services/profile.service';
import { Post } from '../../../models/post/post.model';

@Component({
  selector: 'app-new',
  imports: [ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {

constructor(public profileService:ProfileService) {
  
}
newPost = output<Post>()

  newForm = new FormGroup({
    title: new FormControl('',[
      Validators.required,
      Validators.minLength(10),
  ]),
    body: new FormControl('',[
      Validators.required,
      Validators.minLength(20),
  ]),

  });

  async addPost( draft:Draft):Promise<void> {
    try {
      const draft = this.newForm.value as Draft;
      // Assuming you have a service to handle the API call
     const post = await this.profileService.addPost(draft);
      this.newPost.emit(post);
    } catch (e) {
      alert(e);
    }
  }

}
