import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { Page } from './../../models/page.model';

@Component({
  selector: 'app-list-container',
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './list-container.component.html',
  styleUrl: './list-container.component.scss',
})
export class ListContainerComponent<T, K extends string = 'items'> {
  @Input() pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };
  @Input() itemsPage$!: Observable<Page<T, K>>;
  @Output('refresh') onRefresh: EventEmitter<PageEvent> = new EventEmitter();

  refresh($event: PageEvent) {
    this.onRefresh.emit($event);
  }
}
