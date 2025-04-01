import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../../services/profile.service';
import Post from '../../../../models/post.model';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error: string | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.profileService.fetchPosts().subscribe({
      next: posts => {
        this.posts = posts.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.loading = false;
      },
      error: err => {
        this.error = err.message || 'Error fetching posts';
        this.loading = false;
      },
    });
  }

  handleDelete(postId: string) {
    this.profileService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post.id !== postId);
      },
      error: err => console.error('Delete failed:', err),
    });
  }

  handleUpdate(post: Post, updateData: { title: string; body: string }) {
    this.profileService.updatePost(post.id, updateData).subscribe({
      next: updatedPost => {
        const index = this.posts.findIndex(p => p.id === post.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
      },
      error: err => console.error('Update failed:', err),
    });
  }
}
