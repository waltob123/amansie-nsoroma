// Variables
const hamburger = document.querySelector('.hamburger');
const hamburgerElement = document.querySelector('.hamburger span');
const navMenu = document.querySelector('header nav');
const navItem = document.querySelectorAll('.nav-item');
const removeNavArray = document.querySelectorAll('.remove-nav');
const body = document.querySelector('body');
const observeElement = document.querySelectorAll('.observe');
// const hero = document.querySelector('section#hero');
// const services = document.querySelector('section#services');
// const about = document.querySelector('section#about');
// const contact = document.querySelector('section#contact');


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
        console.log(entry.target);
        if (entry.isIntersecting) observer.unobserve(entry.target);
    })
}, {
    threshold: 0
})

observeElement.forEach(item => {
    observer.observe(item);
})

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
