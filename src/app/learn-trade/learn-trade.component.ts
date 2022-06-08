import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { Subscription, Subject, merge, Observable } from 'rxjs';
import { pairwise, filter, partition, map } from 'rxjs/operators';
import { Pair } from '../pair';

@Component({
  selector: 'app-learn-trade',
  templateUrl: './learn-trade.component.html',
  styleUrls: ['./learn-trade.component.css'],
})
export class LearnTradeComponent implements OnInit {
  @Input() pairs: Pair[];
  @Output() leftpartSelected = new EventEmitter<number>();
  @Output() rightpartSelected = new EventEmitter<number>();
  @Output() leftpartUnselected = new EventEmitter();
  @Output() rightpartUnselected = new EventEmitter();

  @ContentChild('leftpart', { static: false }) leftpart_temp: TemplateRef<any>;
  @ContentChild('rightpart', { static: false })
  rightpart_temp: TemplateRef<any>;
  test: number;

  public assignmentStream = new Subject<{ pair: Pair; side: string }>();

  public solvedStream = new Observable<Pair>();
  public failedStream = new Observable<string>();

  public s_Subscription: Subscription;
  public f_Subscription: Subscription;
  public solvedPairs: Pair[] = [];
  public unsolvedPairs: Pair[] = [];

  constructor() {}

  ngOnInit() {
    for (let i = 0; i < this.pairs.length; i++) {
      this.unsolvedPairs.push(this.pairs[i]);
    }

    const stream = this.assignmentStream.pipe(
      pairwise(),
      filter((comb) => comb[0].side != comb[1].side)
    );

    const [stream1, stream2] = partition(
      (comb) => comb[0].pair === comb[1].pair
    )(stream);

    this.solvedStream = stream1.pipe(map((comb) => comb[0].pair));

    this.failedStream = stream2.pipe(map((comb) => comb[0].side));

    this.s_Subscription = this.solvedStream.subscribe((pair) =>
      this.handleSolvedAssignment(pair)
    );

    this.f_Subscription = this.failedStream.subscribe((side) =>
      this.handleFailedAssignment(side)
    );
  }

  ngOnDestroy() {
    this.s_Subscription.unsubscribe();
    this.f_Subscription.unsubscribe();
  }

  private handleSolvedAssignment(pair: Pair): void {
    this.solvedPairs.push(pair);
    this.remove(this.unsolvedPairs, pair);

    this.leftpartUnselected.emit();
    this.rightpartUnselected.emit();

    this.test = Math.random() * 10;
  }

  private handleFailedAssignment(side1: string): void {
    if (side1 == 'left') {
      this.leftpartUnselected.emit();
    } else {
      this.rightpartUnselected.emit();
    }
  }

  private remove(array: Pair[], pair: Pair) {
    let index = array.indexOf(pair);

    if (index > -1) {
      array.splice(index, 1);
    }
  }
}
