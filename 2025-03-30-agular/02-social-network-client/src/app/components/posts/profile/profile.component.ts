import { DatePipe } from '@angular/common';
import { Component,  computed,  OnDestroy, OnInit, Signal, signal  } from '@angular/core';
import { AllcapsPipe } from '../../../pipes/allcaps.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [DatePipe,AllcapsPipe,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  name: string = 'John Doe';
  correntTime = (new Date());
  intervalId: any;
  username = signal<string>('John Doe');
  email = computed(() =>  `${this.username()}@example.com`);
  isDisabled: boolean = false;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.correntTime = (new Date());
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  sayHay() {
    alert('Hay');
    if (this.isDisabled) {
      this.isDisabled = false;
    }
    else {
      this.isDisabled = true;
    }
  }

}
