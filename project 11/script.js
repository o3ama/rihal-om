// JavaScript for create_event.html
document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const eventName = document.getElementById('event-name').value;
    const eventDescription = document.getElementById('event-description').value;
    const eventDate = document.getElementById('event-date').value;
    const eventPhoto = document.getElementById('event-photo').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const event = {
            name: eventName,
            description: eventDescription,
            date: eventDate,
            photo: e.target.result
        };

        // Retrieve events from Local Storage
        const events = JSON.parse(localStorage.getItem('events')) || [];

        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));

        showAlert('Event created successfully!', 'success');
        setTimeout(() => {
            location.href = 'index.html';
        }, 2000);
    };
    reader.readAsDataURL(eventPhoto);
});

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('.event-form');
    container.insertBefore(alertDiv, form);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000);
}