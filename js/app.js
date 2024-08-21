'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const contactManager = new ContactManager();
    const popupManager = new PopupManager(contactManager);

    document.getElementById('addContactBtn').addEventListener('click', () => {
        popupManager.showAddContactPopup();
    });

    document.getElementById('deleteAllBtn').addEventListener('click', () => {
        contactManager.deleteAllContacts();
    });

    document.getElementById('search').addEventListener('input', (event) => {
        contactManager.filterContacts(event.target.value);
    });

    document.getElementById('contactList').addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            const id = parseInt(target.dataset.id, 10);
            popupManager.showEditContactPopup(id);
        } else if (target.classList.contains('delete-btn')) {
            const id = parseInt(target.dataset.id, 10);
            contactManager.deleteContact(id);
        }
    });
});
