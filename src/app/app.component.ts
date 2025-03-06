import { Component, OnInit } from '@angular/core';

interface Item {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'virtual-scrolling';
  items: Item[] = [];
  showAllItems = false;
  loading = false;
  startTime = 0;
  renderTime = 0;
  bufferSize = 5;

  ngOnInit() {
    this.items = Array.from({ length: 10000 }).map((_, i) => ({
      id: i,
      name: `Item #${i}`,
      description: `This is the description for item #${i}`
    }));
  }

  
}
