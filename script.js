let eventCount = 0; // Tüm günler için toplam etkinlik sayısını takip ediyoruz

document.getElementById('addEventForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const eventDay = document.getElementById('eventDay').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventText = document.getElementById('eventText').value;

    if (!eventDay || !eventTime || !eventText) {
        alert('Lütfen tüm alanları doldurunuz!');
        return;
    }

    eventCount++;

    const selectedDay = document.getElementById(`day-${eventDay}`);

    const newEvent = document.createElement('a');
    newEvent.className = 'event';

    const eventDateDiv = document.createElement('div');
    eventDateDiv.className = 'eventDate';
    eventDateDiv.textContent = eventTime;

    const eventIconDiv = document.createElement('div');
    eventIconDiv.className = 'eventIcon';
    eventIconDiv.innerHTML = '<i class="material-icons">groups</i>';

    const eventTextDiv = document.createElement('div');
    eventTextDiv.className = 'eventText';
    eventTextDiv.textContent = eventText;

    newEvent.appendChild(eventDateDiv);
    newEvent.appendChild(eventIconDiv);
    newEvent.appendChild(eventTextDiv);

    // Etkinliği doğru sıraya eklemek için listeyi sıralıyoruz
    const events = Array.from(selectedDay.querySelectorAll('.event'));
    events.push(newEvent);
    events.sort((a, b) => {
        const timeA = a.querySelector('.eventDate').textContent;
        const timeB = b.querySelector('.eventDate').textContent;
        return timeA.localeCompare(timeB);
    });

    // Eski etkinlikleri temizleyip sıralı bir şekilde yeniden ekliyoruz
    selectedDay.querySelectorAll('.event').forEach(event => event.remove());
    events.forEach(event => selectedDay.appendChild(event));

    // Formu sıfırlıyoruz
    document.getElementById('addEventForm').reset();

    document.getElementById('removeEventDay').dispatchEvent(new Event('change'));
});

document.getElementById('removeEventDay').addEventListener('change', function(e) {
    const selectedDayId = e.target.value;
    const selectedDay = document.getElementById(`day-${selectedDayId}`);

    const eventSelect = document.getElementById('removeEventSelect');
    eventSelect.innerHTML = '';

    const events = Array.from(selectedDay.querySelectorAll('.event'));

    if (events.length === 0) {
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'Bu gün için etkinlik yok';
        eventSelect.appendChild(emptyOption);
        return;
    }

    events.forEach((event, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${event.querySelector('.eventDate').textContent} - ${event.querySelector('.eventText').textContent}`;
        eventSelect.appendChild(option);
    });
});

document.getElementById('removeEventForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const removeDay = document.getElementById('removeEventDay').value;
    const eventIndex = document.getElementById('removeEventSelect').value;

    if (!removeDay || eventIndex === '') {
        alert('Lütfen tüm alanları doldurunuz!');
        return;
    }

    const selectedDay = document.getElementById(`day-${removeDay}`);
    const events = Array.from(selectedDay.querySelectorAll('.event'));

    const eventToRemove = events[eventIndex];

    if (eventToRemove) {
        eventToRemove.remove();
        alert('Etkinlik başarıyla silindi.');

        // Etkinlik listesini güncelle
        document.getElementById('removeEventDay').dispatchEvent(new Event('change'));
    } else {
        alert('Seçilen etkinlik bulunamadı!');
    }
});

