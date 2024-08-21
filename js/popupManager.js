'use strict';

class PopupManager {
    constructor(contactManager) {
        this.contactManager = contactManager;
        this.popup = document.getElementById('popup');
        this.contactForm = document.getElementById('contactForm');
        this.closePopupBtn = document.getElementById('closePopupBtn');
        this.cancelBtn = document.getElementById('cancelBtn');

        this.closePopupBtn.addEventListener('click', () => {
            this.hidePopup();
        });

        this.cancelBtn.addEventListener('click', () => {
            this.hidePopup();
        });

        this.contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.saveContact();
        });
    }

    showAddContactPopup() {
        this.contactForm.reset();
        document.getElementById('contactId').value = '';
        document.getElementById('photo').value = '';
        this.popup.classList.remove('hidden');
    }

    showEditContactPopup(id) {
        const contact = this.contactManager.getContactById(id);
        if (contact) {
            document.getElementById('contactId').value = contact.id;
            document.getElementById('photo').value = contact.photo;
            document.getElementById('name').value = contact.name;
            document.getElementById('phone').value = contact.phone;
            document.getElementById('address').value = contact.address;
            document.getElementById('email').value = contact.email;
            document.getElementById('notes').value = contact.notes;
            this.popup.classList.remove('hidden');
        }
    }

    hidePopup() {
        this.popup.classList.add('hidden');
    }

    saveContact() {
        const id = parseInt(document.getElementById('contactId').value, 10);
        const photo = document.getElementById('photo').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const notes = document.getElementById('notes').value;

        if (name && phone) {
            const contact = { id, photo, name, phone, address, email, notes };
            if (id) {
                this.contactManager.updateContact(contact);
            } else {
                this.contactManager.addContact(contact);
            }
            this.hidePopup();
        } else {
            alert('Name and phone are required.');
        }
    }
}

