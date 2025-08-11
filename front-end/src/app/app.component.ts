import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatButtonToggleModule,
    RouterModule,
  ],
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }

      .toolbar-title {
        margin-left: 8px;
        font-weight: bold;
        font-size: 20px;
      }

      a[mat-button] {
        color: white;
        text-transform: uppercase;
        font-weight: 500;
        margin-right: 12px;
        self-align: end;
      }

      a {
        background-color: rgb(167, 176, 250);
        border-radius: 4px;
      }

      .active-link {
        background-color: rgb(62, 84, 255);
        border-radius: 4px;
      }

      .custom-mat-toobar {
        justify-content: flex-end;
      }
    `,
  ],
  template: `
    <mat-toolbar color="primary" class="spacer">
      <mat-toolbar-row>
        <mat-icon class="toolbar-icon">business</mat-icon>
        <span class="toolbar-title">Company & Supplier Manager</span>

        <!--  -->
        <mat-toolbar-row class="custom-mat-toobar">
          <a mat-button routerLink="/company" routerLinkActive="active-link"
            >Companies</a
          >
          <a mat-button routerLink="/supplier" routerLinkActive="active-link"
            >Suppliers</a
          >
        </mat-toolbar-row>
      </mat-toolbar-row>
    </mat-toolbar>

    <router-outlet />
  `,
})
export class AppComponent {}
