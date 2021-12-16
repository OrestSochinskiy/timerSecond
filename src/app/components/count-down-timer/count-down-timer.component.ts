import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: `count-down-timer.component.html`,
  styleUrls: ['count-down-timer.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  public dateNow = new Date();
  public dDay = new Date('Feb 02 2022 23:50:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference:any;
  public secondsToDday:any;
  public minutesToDday:any;
  public hoursToDday:any;
  public daysToDday:any;
  public timeBt: boolean = false;


  private getTimeDifference () {
    this.timeDifference = this.dDay.getTime() - new  Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits (timeDifference:any) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
    if(this.daysToDday === 0 && this.hoursToDday === 0 && this.minutesToDday === 0 && this.secondsToDday === 0){
        this.timeBt = !this.timeBt
    }
  }

  ngOnInit() {
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}

export class CountDownTimerComponent {
}
