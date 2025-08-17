import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  menu = [
    {
      label: 'Workshop',
      expanded: false,
      children: [
        {
          label: 'Vehicles',
          expanded: false,
          children: [
            { label: 'Register' },
            { label: 'Level 3 - A1b' }
          ]
        },
        {
          label: 'Level 2 - A2',
          expanded: false,
          children: [
            { label: 'Level 3 - A2a' }
          ]
        }
      ]
    },
    {
      label: 'Level 1 - B',
      expanded: false,
      children: [
        {
          label: 'Level 2 - B1',
          expanded: false,
          children: [
            { label: 'Level 3 - B1a' }
          ]
        }
      ]
    }
  ];

  toggle(item: any) {
    item.expanded = !item.expanded;
  }
} 