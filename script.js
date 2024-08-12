document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtn = document.getElementById('openPopupBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const popup = document.getElementById('popup');
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    const searchBox = document.getElementById('searchBox');
    let editingContactId = null;

    openPopupBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
    });

    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        contactForm.reset();
        editingContactId = null;
    });

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        if (name && email) {
            if (editingContactId) {
                // Edit contact
                const contactItem = document.getElementById(editingContactId);
                contactItem.querySelector('.contact-info').textContent = `${name} - ${email}`;
                editingContactId = null;
            } else {
                // Add new contact
                const listItem = document.createElement('li');
                listItem.id = 'contact-' + Date.now();
                listItem.innerHTML = `
                    <span class="contact-info">${name} - ${email}</span>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                `;
                contactList.appendChild(listItem);
            }
            contactForm.reset();
            popup.style.display = 'none';
        }
    });

    contactList.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const listItem = event.target.closest('li');
            const contactInfo = listItem.querySelector('.contact-info').textContent.split(' - ');
            document.getElementById('name').value = contactInfo[0];
            document.getElementById('email').value = contactInfo[1];
            editingContactId = listItem.id;
            popup.style.display = 'flex';
        }

        if (event.target.classList.contains('delete-btn')) {
            if (confirm(' delete this contact?')) {
                const listItem = event.target.closest('li');
                listItem.remove();
            }
        }
    });

    deleteAllBtn.addEventListener('click', () => {
        if (confirm(' delete all contacts?')) {
            contactList.innerHTML = '';
        }
    });

    searchBox.addEventListener('input', () => {
        const searchTerm = searchBox.value.toLowerCase();
        const contacts = contactList.querySelectorAll('li');
        contacts.forEach(contact => {
            const contactText = contact.querySelector('.contact-info').textContent.toLowerCase();
            contact.style.display = contactText.includes(searchTerm) ? '' : 'none';
        });
    });
});
