import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private defectedSource = new BehaviorSubject<number>(500);
  private notDefectedSource = new BehaviorSubject<number>(9000);
  private efficiency = new BehaviorSubject<number>(94);
  private machineWorking = new BehaviorSubject<boolean>(true)

  defected$ = this.defectedSource.asObservable();
  notDefected$ = this.notDefectedSource.asObservable();
  efficiency$ = this.efficiency.asObservable();
  machineWorking$ = this.machineWorking.asObservable();

  private incrementDefected = 10;
  private incrementNotDefected = 200;

  constructor() {
    interval(2000).subscribe(() => {
      const newDefected = this.defectedSource.value + this.incrementDefected;
      const newNotDefected = this.notDefectedSource.value + this.incrementNotDefected;
      const newEfficiency = parseFloat(((newNotDefected * 100)/ (newDefected + newNotDefected)).toFixed(2))
      this.defectedSource.next(newDefected);
      this.notDefectedSource.next(newNotDefected);
      this.efficiency.next(newEfficiency)
    });
  }
}
