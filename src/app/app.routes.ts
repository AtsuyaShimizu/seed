import { Routes } from '@angular/router';
import { Board } from './board/board';
import { IdeaDetail } from './idea-detail/idea-detail';

export const routes: Routes = [
  { path: '', component: Board },
  { path: 'ideas/:id', component: IdeaDetail },
  { path: '**', redirectTo: '' },
];
