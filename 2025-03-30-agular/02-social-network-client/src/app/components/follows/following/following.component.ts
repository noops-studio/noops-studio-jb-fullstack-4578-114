import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowersService } from '../../../../services/followers.service.spec';
import User from '../../../../models/user.model';

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="following">
      <h3>Following</h3>
      <ul>
        <li *ngFor="let user of following">
          {{ user.name }}
          <button (click)="unfollow(user.id)">Unfollow</button>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  following: User[] = [];

  constructor(private followersService: FollowersService) {}

  ngOnInit(): void {
    this.loadFollowing();
  }

  loadFollowing() {
    this.followersService.getFollowing().subscribe({
      next: users => this.following = users,
      error: err => console.error(err)
    });
  }

  unfollow(id: string) {
    this.followersService.unfollowUser(id).subscribe({
      next: () => this.following = this.following.filter(u => u.id !== id),
      error: err => console.error(err)
    });
  }
}
