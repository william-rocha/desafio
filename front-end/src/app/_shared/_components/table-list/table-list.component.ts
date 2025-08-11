import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss',
})
export class TableListComponent<T = any> {
  @Input() data: T[] = [];

  @Output() details: EventEmitter<T> = new EventEmitter(false);
  @Output() edit: EventEmitter<T> = new EventEmitter(false);
  @Output() remove: EventEmitter<T> = new EventEmitter(false);
  @Output() add: EventEmitter<boolean> = new EventEmitter(false);
  @Output() view: EventEmitter<T> = new EventEmitter(false);

  private _displayedColumns: string[] = [];
  columns: string[] = [];

  @Input()
  set displayedColumns(columns: string[]) {
    this.columns = [...columns];
    this._displayedColumns = [...columns, 'actions'];
  }

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  onDetails(record: T) {
    this.details.emit(record);
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(record: T) {
    this.edit.emit(record);
  }

  onRemove(record: T) {
    this.remove.emit(record);
  }

  onView(record: T) {
    this.view.emit(record);
  }
}
