import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';

interface Item {
  id: number;
  name: string;
  description: string;
}

export class MyCustomDataSource extends DataSource<Item> {
  private _dataStream = new BehaviorSubject<Item[]>([]);

  constructor(initialData: Item[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Item[]> {
    return this._dataStream;
  }

  disconnect() {
    this._dataStream.complete();
  }

  setData(data: Item[]) {
    this._dataStream.next(data);
  }

  getData(): Item[] {
    return this._dataStream.value;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'virtual-scrolling';
  
  // For Array example
  items: Item[] = [];
  
  // For Observable example
  itemsObservable: Observable<Item[]>;
  itemsSubject = new BehaviorSubject<Item[]>([]);
  
  // For DataSource example
  itemsDataSource: MyCustomDataSource;

  // For interface control
  activeExample: 'array' | 'observable' | 'datasource' = 'array';
  
  showAllItems = false;
  loading = false;
  startTime = 0;
  renderTime = 0;
  bufferSize = 5;

  ngOnInit() {
    // Generate data
    const generatedItems = Array.from({ length: 10000 }).map((_, i) => ({
      id: i,
      name: `Item #${i}`,
      description: `This is the description for item #${i}`
    }));
    
    // Set up array example
    this.items = generatedItems;
    
    // Set up observable example
    this.itemsSubject.next(generatedItems);
    this.itemsObservable = this.itemsSubject.asObservable();
    
    // Set up datasource example
    this.itemsDataSource = new MyCustomDataSource(generatedItems);
  }
  
  // Method to switch between examples
  changeExample(exampleType: 'array' | 'observable' | 'datasource') {
    this.activeExample = exampleType;
  }
  
  // Demo method to show that we can update the observable data
  addItemToObservable() {
    const currentItems = this.itemsSubject.value;
    const newId = currentItems.length;
    const newItem = {
      id: newId,
      name: `New Observable Item #${newId}`,
      description: `This is a newly added item through the observable at ${new Date().toLocaleTimeString()}`
    };
    this.itemsSubject.next([...currentItems, newItem]);
  }
  
  // Demo method to show that we can update the datasource
  addItemToDataSource() {
    const currentItems = this.itemsDataSource.getData();
    const newId = currentItems.length;
    const newItem = {
      id: newId,
      name: `New DataSource Item #${newId}`,
      description: `This is a newly added item through the datasource at ${new Date().toLocaleTimeString()}`
    };
    this.itemsDataSource.setData([...currentItems, newItem]);
  }
}
