import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HumanBuilderComponent } from '../components/human-builder/human-builder.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HumanBuilderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'konva-human';
}
