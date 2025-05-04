import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CreateHumanService } from '../../services/create-human.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-human-builder',
  templateUrl: `./human-builder.component.html`,
  styleUrl: `./human-builder.component.scss`
})
export class HumanBuilderComponent implements AfterViewInit {
  @ViewChild('stageContainer', { static: true }) stageContainer!: ElementRef;

  constructor(private createHumanService: CreateHumanService) {}

  ngAfterViewInit() {
    this.createHumanService.initStage(
      this.stageContainer.nativeElement, 
      window.innerWidth, 
      window.innerHeight
    );
    this.createHumanService.createHuman();
  }
}