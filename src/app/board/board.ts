import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Idea, ideas as seedIdeas } from '../data/ideas';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  protected readonly pageSize = 20;
  protected searchTerm = '';
  protected currentPage = 1;
  protected readonly ideas: Idea[] = seedIdeas;

  protected get filteredIdeas(): Idea[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.ideas;
    }
    return this.ideas.filter((idea) =>
      `${idea.title} ${idea.summary} ${idea.category} ${idea.tags.join(' ')}`
        .toLowerCase()
        .includes(term)
    );
  }

  protected get displayedIdeas(): Idea[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredIdeas.slice(start, start + this.pageSize);
  }

  protected get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredIdeas.length / this.pageSize));
  }

  protected goToPage(page: number): void {
    this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
  }

  protected onSearchChange(): void {
    this.currentPage = 1;
  }

  protected trackById(_: number, idea: Idea): number {
    return idea.id;
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
