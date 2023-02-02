import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { Book } from '../entities/book.entity';

@EventSubscriber()
export class BookSubscriber implements EntitySubscriberInterface<Book> {
  listenTo() {
    return Book;
  }

  afterInsert(event: InsertEvent<any>): Promise<any> | void {
    console.log(event.entity);
  }
}
