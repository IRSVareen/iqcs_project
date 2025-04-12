import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private socket: Socket

  private defectedSource = new BehaviorSubject<number>(500);
  private notDefectedSource = new BehaviorSubject<number>(9000);
  private efficiency = new BehaviorSubject<number>(94);
  private machineWorking = new BehaviorSubject<boolean>(true);
  private connectedSource = new BehaviorSubject<boolean>(false);


  defected$ = this.defectedSource.asObservable();
  notDefected$ = this.notDefectedSource.asObservable();
  efficiency$ = this.efficiency.asObservable();
  machineWorking$ = this.machineWorking.asObservable();
  connected$ = this.connectedSource.asObservable()

  constructor() {
    this.socket = io('http://localhost:5000'); 

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
      this.connectedSource.next(true);
    });

    this.socket.on('disconnect', () => {
      console.warn('Disconnected from socket server');
      this.connectedSource.next(false);
    });

    this.socket.on('updateData', (data) => {
      this.defectedSource.next(data.defected);
      this.notDefectedSource.next(data.notDefected);
      this.efficiency.next(data.efficiency);
    });
  }
}
