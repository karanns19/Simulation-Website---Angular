import { Component, OnInit } from '@angular/core';
import { TRADES } from '../trade';

@Component({
  selector: 'app-trade1',
  templateUrl: './trade1.component.html',
  styleUrls: ['./trade1.component.css'],
})
export class Trade1Component implements OnInit {
  trades = TRADES;

  leftpartSelectedId: number = -1;
  rightpartSelectedId: number = -1;

  constructor() {}

  ngOnInit() {}
  onLeftpartSelected(id: number): void {
    this.leftpartSelectedId = id;
  }

  onRightpartSelected(id: number): void {
    this.rightpartSelectedId = id;
  }

  onLeftpartUnselected(): void {
    this.leftpartSelectedId = -1;
  }

  onRightpartUnselected(): void {
    this.rightpartSelectedId = -1;
  }
}
