import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Contact } from './contact.model';
import { Http } from '@angular/http';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: Array<Contact> = [];
  contactParams: string = '';
  constructor(private http: Http) { }


  async ngOnInit() {
    this.loadContacts();
  }

  async loadContacts() {
    const savedContacts = this.getItemsFromLocalStorage('contacts');
    if (savedContacts && savedContacts.length > 0) {
      this.contacts = savedContacts;
    } else {
      this.contacts = await this.loadItemsFromFile();
    }
    this.sortByID(this.contacts);
  }

  async loadItemsFromFile() {
    const data = await this.http.get('assets/contacts.json').toPromise();
    console.log('from loadItemsFromFile', data.json());
    return data.json();

  }


  addContact() {
    this.contacts.unshift(new Contact({}));
    console.log('this.contacts...', this.contacts);
  }

  deleteContact(index: number) {

    console.log('deleteContact from index: ', index);
    this.contacts.splice(index, 1);
    this.saveItemsToLocalStorage(this.contacts);
  }

  saveContact(contact: Contact) {
    console.log('from saveContact..', contact);
    contact.editing = false;
    this.saveItemsToLocalStorage(this.contacts);
  }

  saveItemsToLocalStorage(contacts: Array<Contact>) {
    contacts = this.sortByID(contacts);
    const savedContacts = localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('from saveItemsToLocalStorage savedContacts', savedContacts);
    return savedContacts;
  }

  getItemsFromLocalStorage(key: string) {
    const savedContacts = JSON.parse(localStorage.getItem(key));
    console.log('from getItemsFromLocalStorage savedContacts:', savedContacts);
    return savedContacts;
  }

  searchContact(params: string) {
    console.log('from searchContact params: ', params);
    this.contacts = this.contacts.filter((item: Contact) => {
      const fullName = item.firstName + ' ' + item.lastName;
      console.log('item ----> ', item.firstName);
      if (params === fullName || params === item.firstName || params === item.lastName) {
        return true;
      } else {
        return false;
      }
    });
  }

  sortByID(contacts: Array<Contact>) {
    contacts.sort((a: Contact, b: Contact) => {
      return a.id > b.id ? 1 : -1;
    });
    console.log('the sorted contacts', contacts);
    return contacts;
  }
}
