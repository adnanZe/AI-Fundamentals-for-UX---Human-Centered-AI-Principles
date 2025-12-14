import { Component, signal } from '@angular/core';
import { WrongExampleComponent } from './components/wrong-example/wrong-example';
import { RightExampleComponent } from './components/right-example/right-example';
import { RecruitmentWrongComponent } from './components/recruitment-wrong/recruitment-wrong';
import { RecruitmentRightComponent } from './components/recruitment-right/recruitment-right';

@Component({
  selector: 'app-root',
  imports: [
    WrongExampleComponent,
    RightExampleComponent,
    RecruitmentWrongComponent,
    RecruitmentRightComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly selectedExample = signal<'mindset' | 'recruitment'>('mindset');

  protected selectExample(example: 'mindset' | 'recruitment'): void {
    this.selectedExample.set(example);
  }
}
