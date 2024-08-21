'use strict';

class ContactManager {
    constructor() {
        this.contacts = [
            { id: 1, name: 'Sam Smith', phone: '123-456-7890', address: '123 Elm Street', email: 'Sam@example.com', notes: 'Friend from college', photo:"images/Sam.jpg.jpg"},
            { id: 2, name: 'Bob Johnson', phone: '234-567-8901', address: '456 Oak Avenue', email: 'bob@example.com', notes: 'Work colleague', photo: "images/bob.jpg.jpg" },
            { id: 3, name: 'Charlie Brown', phone: '345-678-9012', address: '789 Pine Road', email: '', notes: '', photo: "images/Charlie.jpg" },
            { id: 4, name: 'Daisy Lee', phone: '456-789-0123', address: '101 Maple Street', email: 'daisy@example.com', notes: '', photo: "images/daisy.jpg.jpg" }
        ];
        this.renderContacts();
    }

    getContactById(id) {
        return this.contacts.find(contact => contact.id === id);
    }

    addContact(contact) {
        contact.id = this.contacts.length ? Math.max(...this.contacts.map(c => c.id)) + 1 : 1;
        this.contacts.push(contact);
        this.renderContacts();
    }

    updateContact(updatedContact) {
        const index = this.contacts.findIndex(contact => contact.id === updatedContact.id);
        if (index !== -1) {
            this.contacts[index] = updatedContact;
            this.renderContacts();
        }
    }

    deleteContact(id) {
        this.contacts = this.contacts.filter(contact => contact.id !== id);
        this.renderContacts();
    }

    deleteAllContacts() {
        this.contacts = [];
        this.renderContacts();
    }

    filterContacts(query) {
        this.renderContacts(query);
    }

    renderContacts(query = '') {
        const contactList = document.getElementById('contactList');
        contactList.innerHTML = '';

        const filteredContacts = this.contacts.filter(contact =>
            contact.name.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredContacts.length === 0) {
            contactList.innerHTML = '<p>No contacts found.</p>';
        } else {
            filteredContacts.forEach(contact => {
                const contactItem = document.createElement('div');
                contactItem.className = 'contact-item';
                contactItem.innerHTML = `
                    <img src="${contact.photo}" alt="${contact.name}'s photo">
                    <span>${contact.name} (${contact.phone})</span>
                    <div>
                        <button class="edit-btn" data-id="${contact.id}">Edit</button>
                        <button class="delete-btn" data-id="${contact.id}">Delete</button>
                    </div>
                `;
                contactList.appendChild(contactItem);
            });
        }
    }
}
