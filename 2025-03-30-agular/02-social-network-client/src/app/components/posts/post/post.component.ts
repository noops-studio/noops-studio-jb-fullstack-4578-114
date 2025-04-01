import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import Post from '../../../../models/post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TinyEditorComponent } from '../../common/tiny-editor/tiny-editor.component';
import { ImageCarouselComponent } from '../../common/image-carousel/image-carousel.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule, TinyEditorComponent, ImageCarouselComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post!: Post;
  @Input() profilePictureUrl: string = 'assets/default-profile.png';

  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<{ title: string; body: string }>();

  isEditing: boolean = false;
  isDeleteDialogOpen: boolean = false;
  showComments: boolean = false;

  newTitle: string = '';
  newBody: string = '';

  newComment: string = '';
  commentError: string | null = null;

  isAddingComment: boolean = false;
  isUpdating: boolean = false;

  // Expose MIN_COMMENT_LENGTH to the template
  public readonly MIN_COMMENT_LENGTH = 20;

  toggleEditing(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.newTitle = this.post.title;
      this.newBody = this.post.body;
    }
  }

  toggleShowComments(): void {
    this.showComments = !this.showComments;
  }

  openDeleteDialog(): void {
    this.isDeleteDialogOpen = true;
  }

  closeDeleteDialog(): void {
    this.isDeleteDialogOpen = false;
  }

  async handleUpdate(): Promise<void> {
    this.isUpdating = true;
    try {
      this.update.emit({ title: this.newTitle, body: this.newBody });
      this.isEditing = false;
    } catch (error) {
      console.error('Failed to update post:', error);
    } finally {
      this.isUpdating = false;
    }
  }

  async handleDelete(): Promise<void> {
    this.delete.emit(this.post.id);
    this.isDeleteDialogOpen = false;
  }

  validateComment(comment: string): boolean {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = comment;
    const stripped = tmp.textContent || tmp.innerText || '';
    return stripped.length >= this.MIN_COMMENT_LENGTH;
  }

  async handleAddComment(): Promise<void> {
    if (!this.validateComment(this.newComment)) {
      this.commentError = `Comment must be at least ${this.MIN_COMMENT_LENGTH} characters long`;
      return;
    }
    this.commentError = null;
    this.isAddingComment = true;
    try {
      if (!this.post.comments) {
        this.post.comments = [];
      }
      this.post.comments.push({
        id: Date.now().toString(),
        userId: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        body: this.newComment,
        // Note: Make sure the User object has all required properties (see updated User interface)
        user: { id: '', name: 'Current User', username: '', password: '', createdAt: '', updatedAt: '', isFollowing: false },
        postId: ''
      });
      this.newComment = '';
    } catch (error) {
      this.commentError = 'Failed to add comment. Please try again.';
    } finally {
      this.isAddingComment = false;
    }
  }

  formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return date.toLocaleDateString();
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  }

  getImages(): string[] {
    let images: string[] = [];
    if (this.post.imageUrl) {
      try {
        images = JSON.parse(this.post.imageUrl);
        if (!Array.isArray(images)) {
          images = [this.post.imageUrl];
        }
      } catch (e) {
        images = [this.post.imageUrl];
      }
    }
    return images;
  }
}
