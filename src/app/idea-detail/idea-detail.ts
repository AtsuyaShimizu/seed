import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Idea, ideas } from '../data/ideas';

@Component({
  selector: 'app-idea-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './idea-detail.html',
  styleUrl: './idea-detail.scss',
})
export class IdeaDetail {
  protected readonly idea?: Idea;

  constructor(route: ActivatedRoute) {
    const id = Number(route.snapshot.paramMap.get('id'));
    this.idea = ideas.find((item) => item.id === id);
  }

  protected stageLabel(stage: Idea['stage']): string {
    switch (stage) {
      case 'growing':
        return '育成中';
      case 'in-progress':
        return '着手中';
      default:
        return 'シード';
    }
  }
}
