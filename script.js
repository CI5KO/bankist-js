'use strict';
/*
  This code has been writen by Hector OG  
  <hector_oliva16k@hotmail.com>
  <www.facebook.com/Ci5ko7u7>
  Powered by JavaScript Course by Jonas Schmedtmann
*/

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section01 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const slides = document.querySelectorAll('.slide');
const btnleft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  section01.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  //Prevent to null values and ends the function
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
const handlerEvent = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(s => {
      if (s !== link) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handlerEvent.bind(0.5));
nav.addEventListener('mouseout', handlerEvent.bind(1));

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const observerOps = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerOberser = new IntersectionObserver(stickyNav, observerOps);
headerOberser.observe(header);

const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObersver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObersver.observe(section);
  section.classList.add('section--hidden');
});

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

const slider = () => {
  let currSlide = 0;
  const maxSlide = slides.length;
  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}">
      </button>`
      );
    });
  };
  const activateDot = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const goToSlide = slide =>
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  const nextLine = () => {
    if (currSlide === maxSlide - 1) currSlide = 0;
    else currSlide++;
    goToSlide(currSlide);
    activateDot(currSlide);
  };
  const prevLine = () => {
    if (currSlide === 0) currSlide = maxSlide - 1;
    else currSlide--;
    goToSlide(currSlide);
    activateDot(currSlide);
  };
  const initDots = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  initDots();

  btnRight.addEventListener('click', nextLine);
  btnleft.addEventListener('click', prevLine);
  document.addEventListener('keydown', e => {
    e.key === 'ArrowLeft' && prevLine();
    e.key === 'ArrowRight' && nextLine();
  });

  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
// const initialCords = section01.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// document.querySelectorAll('.nav__link').forEach(function (e) {
//   e.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//////////////////////////////////////////
// ALL LECTURE NOTES
/*

//Scrollto code
// const s1cords = section01.getBoundingClientRect();
// console.log(e.target.getBoundingClientRect());
// console.log('Current scroll: (X/Y)', window.pageXOffset, window.pageYOffset);
// console.log(
//   'Height/Width viewport',
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

//Scrolling
//OLDER VERSIONS

//Scrolling normal
// window.scrollTo(
//   s1cords.left + window.pageXOffset,
//   s1cords.top + window.pageYOffset
// );

//Scrolling with smooth animation
// window.scrollTo({
//   left: s1cords.left + window.pageXOffset,
//   top: s1cords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

//NEW VERSIONS

//Scrolling normal
// section01.scrollIntoView();

//Scrolling with smooth animation

//Selecting elements on js
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);
document.getElementById('section--1');
const allBtns = document.getElementsByTagName('button');
console.log(allBtns);
console.log(document.getElementsByClassName('btn'));

//Creating and inserting elements on js
//Create new HTML element
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analystics.';
message.innerHTML =
  'We use cookies for improved functionality and analystics. <button class="btn btn--close-cookie">Got it! </button>';
//add the message at the beggining of the div (first child)
//header.prepend(message);
//add the message at the end of the div (last child)
header.append(message);
//header.append(message.cloneNode(true));

//add the message before the header
//header.before(message);
//add the message after the header
//header.after(message);
//remove elements by event listener
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //remove element (newest versions)
    message.remove();
    //remove element (older versions)
    //message.parentElement.removeChild(message);
  });

//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '105%';
//Log nothing
console.log(message.style.height);
//Log the color
console.log(message.style.backgroundColor);
//Get the computed style
console.log(getComputedStyle(message).color);
//Set a new style value to a current
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
//Set new style
document.documentElement.style.setProperty('--color-primary', 'orangered');

//Atributes
//Only reads standard propeties of the tags
const logo = document.querySelector('.nav__logo');
console.log(logo.className);
//Get any atribute created
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Banklist');
//Get the absolute uri of the element
console.log(logo.src);
//Get the relative uri of the element
console.log(logo.getAttribute('src'));

// Data atributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// Dont use it, rescribe all the classes and set only 1
logo.className = 'Hector';

const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! you are reading the heading');
  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);
//Oldest versions
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! you are reading the heading');
// };

//Random color
const randonInt = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randonInt(0, 255)}, ${randonInt(0, 255)}, ${randonInt(0, 255)})`;
document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('link');
  //Stop sending the propagation from the current element to the others
  e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('Container');
});
document.querySelector('.nav').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('Nav');
});

const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(e => {
  if (e !== h1) e.style.transform = 'scale(0.5)';
});

*/
