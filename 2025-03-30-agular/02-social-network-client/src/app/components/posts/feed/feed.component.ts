import { Component, OnInit } from '@angular/core';
import Post from '../../../../models/post.model';
import { FeedService } from '../../../../services/feed.service.spec';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error: string | null = null;

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed() {
    this.feedService.getFeed().subscribe({
      next: posts => {
        this.posts = posts;
        this.loading = false;
      },
      error: err => {
        this.error = err.message || 'Error fetching feed';
        this.loading = false;
      }
    });
  }
}