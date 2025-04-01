import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowersService } from '../../../../services/followers.service.spec';
import User from '../../../../models/user.model';

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="followers">
      <h3>Followers</h3>
      <ul>
        <li *ngFor="let user of followers">
          {{ user.name }}
          <button (click)="toggleFollow(user)">
            {{ user.isFollowing ? 'Unfollow' : 'Follow' }}
          </button>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers: User[] = [];

  constructor(private followersService: FollowersService) {}

  ngOnInit(): void {
    this.loadFollowers();
  }

  loadFollowers() {
    this.followersService.getFollowers().subscribe({
      next: users => this.followers = users,
      error: err => console.error(err)
    });
  }

  toggleFollow(user: User) {
    if (user.isFollowing) {
      this.followersService.unfollowUser(user.id).subscribe({
        next: () => user.isFollowing = false,
        error: err => console.error(err)
      });
    } else {
      this.followersService.followUser(user.id).subscribe({
        next: () => user.isFollowing = true,
        error: err => console.error(err)
      });
    }
  }
}
