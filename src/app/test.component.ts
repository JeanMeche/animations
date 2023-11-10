import {AnimationEvent, animate, state, style, transition, trigger} from '@angular/animations'
import {Component, Output} from '@angular/core'
import {Observable, Subject} from 'rxjs'

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [],
    animations: [
        trigger('myAnim', [
            state('h', style({height: 0, opacity: 0, visibility: 'hidden'})),
            state('v', style({height: '*', opacity: 1, visibility: 'visible'})),
            transition('v <=> h', [animate('200ms ease-out')]),
        ]),
    ],
    styles: `
  :host { display: block; padding: 8px; background: rgba(0,0,0,0.1); } 
  .box { overflow: hidden; }
  `,
    template: `
    <h3>Test-Component</h3>
    <p>current state: <strong>{{state}}</strong></p>
    <button (click)="toggle()">{{show ? 'hide' : 'show' }}</button>

    <div class="box" [@myAnim]="state" (@myAnim.start)="onAnimStart($event)">
      <p>Hello World</p>
      <p>Hello Test</p>
      <p>Foo Bar</p>
    </div>
  `,
})
export class TestComponent {
    @Output()
    readonly animationEvent: Observable<string>

    protected get state() {
        return this.show ? 'v' : 'h'
    }
    protected show = false

    protected readonly animationEventSubject = new Subject<string>()

    constructor() {
        this.animationEvent = this.animationEventSubject.asObservable()
    }

    protected toggle() {
        this.show = !this.show
    }
    protected onAnimStart(ev: AnimationEvent) {
        this.animationEventSubject.next(`${ev.fromState} => ${ev.toState}`)
    }
}
