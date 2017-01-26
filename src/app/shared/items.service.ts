import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Item } from './item.model';
import 'rxjs/add/operator/map';

const BASE_URL = 'http://localhost:3000/items/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class ItemsService {
  constructor(private http: Http) {}

  loadItems() {
    return this.http.get(BASE_URL)
      .map(res => res.json());
  }

  loadItem(id) {
    return this.http.get(`${BASE_URL}${id}`)
      .map(res => res.json());
  }

  saveItem(item: Item) {
    return (item.id) ? this.updateItem(item) : this.createItem(item);
  }

  createItem(item: Item) {
    return this.http.post(`${BASE_URL}`, JSON.stringify(item), HEADER)
      .map(res => res.json());
  }

  updateItem(item: Item) {
    return this.http.patch(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
      .map(res => res.json());
  }

  deleteItem(item: Item) {
    return this.http.delete(`${BASE_URL}${item.id}`)
      .map(res => res.json());
  }
}
