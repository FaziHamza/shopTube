import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'st-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userId = ''; 
  profile: any = {};

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')!).userId
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile(this.userId).subscribe(
      (data) => {
        this.profile = data['data'];
      },
      (error) => {
        console.error('Error loading profile:', error);
      }
    );
  }

  updateProfile(): void {
    this.profileService.updateProfile(this.userId, this.profile).subscribe(
      (data) => {
        console.log('Profile updated successfully:', data);
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
}
