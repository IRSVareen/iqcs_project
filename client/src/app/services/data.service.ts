import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private defectedSource = new BehaviorSubject<number>(2000);
  private notDefectedSource = new BehaviorSubject<number>(8000);

  defected$ = this.defectedSource.asObservable();
  notDefected$ = this.notDefectedSource.asObservable();

  private incrementDefected = 10;
  private incrementNotDefected = 200;

  constructor() {
    interval(2000).subscribe(() => {
      const newDefected = this.defectedSource.value + this.incrementDefected;
      const newNotDefected = this.notDefectedSource.value + this.incrementNotDefected;

      this.defectedSource.next(newDefected);
      this.notDefectedSource.next(newNotDefected);
    });
  }
}
