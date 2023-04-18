// Variables
const hamburger = document.querySelector('.hamburger');
const hamburgerElement = document.querySelector('.hamburger span');
const navMenu = document.querySelector('header nav');
const navItem = document.querySelectorAll('.nav-item');
const removeNavArray = document.querySelectorAll('.remove-nav');
const body = document.querySelector('body');
const observeElement = document.querySelectorAll('.observe');
const upcomingEventsBtn = document.querySelector('.upcoming-btn');



// Functions and callbacks
// function to display navbar
function displayNavbar() {
    hamburgerElement.classList.toggle('open');
    navMenu.classList.toggle('open');
    body.classList.toggle('noscroll');
}

// function to remove navbar
function removeNav() {
    hamburgerElement.classList.remove('open');
    navMenu.classList.remove('open');
    body.classList.remove('noscroll');
}


// Intersection observers
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('show', entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(entry.target);
    })
}, {
    threshold: 0
})

observeElement.forEach(item => {
    observer.observe(item);
})


// create upcoming events function
const events = [];
/* 
Function to create upcoming events section.
This function takes in an array of events. if the length of the 
array is less than 1 it renders a text and a button to book event space
else it renders the events.
*/
function renderUpcomingEvents(events) {
    // main container section
    const main = document.createElement('section');
    main.setAttribute('id', 'upcoming-events-container');
    main.setAttribute('class', 'flexbox');
    
    // upcoming events section
    const container = document.createElement('section');
    container.setAttribute('id', 'upcoming-events');
    
    // append upcoming-events section to main container
    main.appendChild(container);

    // div to container h3 and close btn
    const header = document.createElement('div');
    header.setAttribute('class', 'flexbox');

    // upcoming events h3
    const h3 = document.createElement('h3');
    h3.innerText = 'Upcoming Events';
    
    // upcoming events close btn
    const closeBtn = document.createElement('img');
    closeBtn.setAttribute('class', 'close-btn');
    closeBtn.setAttribute('alt', 'Close button');
    closeBtn.setAttribute('src', '../assests/images/icons/close-btn.png');

    // append h3 and button to header
    header.appendChild(h3);
    header.appendChild(closeBtn);

    // append header to upcoming events
    container.appendChild(header);

    // check if there are any events
    if (events.length < 1 || typeof(events) === undefined) {
        // create paragraph to hold no upcoming events text
        const p = document.createElement('p');
        p.innerText = 'Sorry, there are no upcoming events.'
        
        // create a link btn
        const a = document.createElement('a');
        a.setAttribute('href', './event.html');
        a.setAttribute('class', 'btn submit-btn');
        a.innerText = 'Book event space';
        
        // append p and a to upcoming events
        container.appendChild(p);
        container.appendChild(a);
    } else {
        // loop through events and create event section for each
        for (let event of events) {
            // create event element
            const eventElement = document.createElement('div');
            eventElement.setAttribute('class', 'event');
            
            // create event title element
            const eventTitle = document.createElement('h5');
            eventTitle.innerText = event.title;
            
            // create eventDateTime element
            const eventDateTime = document.createElement('p');
            
            // create event date element
            const eventDate = document.createElement('span');
            eventDate.innerText = event.date;
            eventDate.setAttribute('class', 'event-date');
            
            // create event time element
            const eventTime = document.createElement('span');
            eventTime.innerText = event.time;
            eventTime.setAttribute('class', 'event-date');
            
            // append event date and time to eventDateTime element
            eventDateTime.appendChild(eventDate);
            eventDateTime.appendChild(eventTime);
            eventElement.appendChild(eventTitle);
            eventElement.appendChild(eventDateTime);

            // append event element to upcoming events
            container.appendChild(eventElement);
        }
    }

    return main;
}


// Event listeners
// Display navbar when hamburger menu is clicked
hamburger.addEventListener('click', e => {
    displayNavbar();
})

// Remove navbar when elements with class remove-nav is clicked
removeNavArray.forEach(element => {
    element.addEventListener('click', e => {
        removeNav();
    })
})

upcomingEventsBtn.addEventListener('click', e => {
    e.target.disabled = true;
    body.appendChild(renderUpcomingEvents(events));
    body.classList.add('noscroll');
    const closeBtn = document.querySelector('.close-btn');
    const upcomingEventsElement = document.querySelector('#upcoming-events-container');
    closeBtn.addEventListener('click', e => {
        body.removeChild(upcomingEventsElement);
        upcomingEventsBtn.disabled = false;
        body.classList.remove('noscroll');
    })
})
