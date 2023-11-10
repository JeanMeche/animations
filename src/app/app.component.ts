import {AfterViewInit, Component, TemplateRef, ViewChild, ViewContainerRef, ViewRef} from '@angular/core';
import {TestComponent} from './test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TestComponent],
  styles: `
  :host { 
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    ol ul>li { font-style: italic; }
  } 
  .cockpit { grid-row: 1 / span 2; }
  `,
  template: `
  <div class="cockpit">
    <button (click)="insertVrIntoVc()">insert VR to VC</button>
    <button (click)="removeVrFromVc()">detach VR from VC</button>
    <h3>animation events</h3>
    <pre [innerHtml]="eventLines"></pre>    
  </div>

  <fieldset>
    <legend>ViewContainerRef</legend>
    <ng-template #mySlot />
  </fieldset>

  <div>
    <h3>reproduce failure:</h3>
    <ol>
      <li>click "show"</li>
      <li>click "hide"
      <ul><li>after both clicks, AnimationEvents were emitted</li></ul>
      </li>
      <li>click "detach"</li>
      <ul><li>AnimationEvent to <code>void</code> was emitted</li></ul>
      <li>click "insert"
        <ul>
          <li>no AnimationEvent was emitted</li>
          <li>Content is visible, despite state still <code>h</code></li>
        </ul>
      </li>
      <li>click "show"
         <ul><li>no AnimationEvent was emitted</li></ul>
      </li>  
      <li>click "hide"
       <ul><li>Animation itself is working again; but still no events</li></ul>
      </li>
    </ol>
  </div>
`,
})
export class AppComponent implements AfterViewInit {
  protected useSlot1 = true
  protected currentView: 'form' | 'info' = 'form'
  protected eventLines: string = ''

  @ViewChild('mySlot', {read: ViewContainerRef}) private mySlot!: ViewContainerRef
  @ViewChild('theTpl', {read: TemplateRef}) private theTpl!: TemplateRef<void>

  protected vr!: ViewRef | null

  constructor() {
    setTimeout(() => {
      this.mySlot.createComponent(TestComponent).instance.animationEvent.subscribe(this.onAnimEvent)
    }, 1000)
  }

  ngAfterViewInit() {
  }

  protected readonly onAnimEvent = (ev: string) => (this.eventLines += `${ev}\n`)

  removeVrFromVc() {
    this.vr = this.mySlot.detach()
  }
  insertVrIntoVc() {
    if (this.vr) {
      this.mySlot.insert(this.vr)
      this.vr = null
    }
  }
}
