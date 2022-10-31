import { Injectable } from '@angular/core';
import { Board } from 'src/app/shared/models/board.model';
import {Task} from 'src/app/shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class FilteringService {

  constructor() { }

  filterItems(
    event: {order: string, criteria: string}, 
    array: Task[] | Board[]) {
    switch (event.criteria) {
      case 'name':
        this.filterItemsByName(event.order, array);
        break;
      case 'date':
        this.filterItemsByDate(event.order, array);
        break;
      default:
        break
    }
  }

  filterItemsByName(
    order: string, 
    array: Task[] | Board[]) {
    switch (order) {
      case 'ascending':
        array = array.sort((a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 :
          (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) ? -1 : 0);
        break;
        case 'descending':
          array = array.sort((a, b) => a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase() ? 1 : 
          (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) ? -1 : 0);
          break;
      default:
        break
    }
  }

  filterItemsByDate(
    order: string, 
    array: Task[] | Board[]): void {
    switch (order) {
    case 'ascending':
      array = array.sort((a, b) => {
        const date1 = new Date(a.created_date).getTime()
        const date2 = new Date(b.created_date).getTime()
        return date1 > date2 ? 1 : (date1 < date2) ? -1 : 0
      });
      break;
    case 'descending':
      array = array.sort((a, b) => {
        const date1 = new Date(a.created_date).getTime()
        const date2 = new Date(b.created_date).getTime()
        return date1 < date2 ? 1 : (date1 > date2) ? -1 : 0
      });
      break
    default:
      break
  }
}
}
