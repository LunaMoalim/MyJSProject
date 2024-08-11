document.addEventListener('DOMContentLoaded', function() {
    const openPopupBtn = document.getElementById('openPopupBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const popup = document.getElementById('popup');
    const contactList = document.getElementById('contactList');
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    const contactForm = document.getElementById('contactForm');

    // Open and Close Popup Functionality
    openPopupBtn.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Handle Form Submission
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        addContact(name, email);
        contactForm.reset(); // Reset the form fields
        popup.style.display = 'none';
    });

    function addContact(name, email) {
        const li = document.createElement('li');
        li.textContent = `Name: ${name} | Email: ${email}`;
        contactList.appendChild(li);
    }

    // Delete All Contacts
    deleteAllBtn.addEventListener('click', () => {
        contactList.innerHTML = '';
    });

    // Initial Contacts
    const initialContacts = [
        { name: 'Luna Moalim', email: 'luna.moalim@gmail.com' },
        { name: 'Nicole Moalim', email: 'nicole.moalim@outlook.com' },
        { name: 'Steve Johnson', email: 'steve.johnson@gmail.com' }
    ];

    initialContacts.forEach(contact => addContact(contact.name, contact.email));
});
