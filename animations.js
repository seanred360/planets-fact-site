// animation elements
const header = document.querySelector(".header");
const shootingstars = document.querySelector('.shootingstars');
const background = document.querySelector('.background')
const backgroundGroup = background.childNodes[0]
let circleArray = []

import { currentPlanet } from "./globals.js";
import { previousPlanet } from "./globals.js";
import { planetImg } from "./globals.js";
import { standupTextWrapper } from "./globals.js";
import { statValues } from "./globals.js";

// get current viewport width
function getViewportX() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
}
  
// get current viewport height
function getViewportY() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
}

// These create random x,y coords and sizes for the stars and shooting stars
const randomRadius = () => {
    return Math.random() * 1.7 + getViewportX() / 1000;
};
const getRandomX = () => {
    return Math.floor(Math.random() * Math.floor(window.innerWidth)).toString();
};
const getRandomY = () => {
    return Math.floor(Math.random() * Math.floor(window.innerHeight)).toString();
};

////////////////////////////////
//  GENERATE BACKGROUND STARS //
////////////////////////////////
function createCircle(quantity) {
  //<circle class='star' cx="1155.5" cy="369.5" r="3.5"/>
  for(let i = 0; i < quantity; i++) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle.cx.baseVal.value = getRandomX()
    circle.cy.baseVal.value = getRandomY()
    circle.r.baseVal.value = randomRadius()
    circle.classList.add('star')
    circleArray.push(circle)
    background.childNodes[0].appendChild(circle)
  }
  console.log('number of circles is ' + circleArray.length)
} createCircle(60)

function shuffleCircles() {
  circleArray.forEach(circle => {
    circle.cx.baseVal.value = getRandomX()
    circle.cy.baseVal.value = getRandomY()
    circle.r.baseVal.value = randomRadius()
  })
  background.setAttribute('width', getViewportX())
  background.setAttribute('height', getViewportY())
}

window.addEventListener('resize', shuffleCircles); // move around the stars to fit the screen size everytime the window resizes

// make the background stars twinkle
anime({
    targets: [".star"],
    opacity: [
        {
        duration: 700,
        value: "0"
        },
        {
        duration: 700,
        value: "100"
        }
    ],
    easing: "linear",
    loop: true,
    delay: (el, i) => 50 * i
});

////////////////////////////////
//  GENERATE SHOOTING STARS ////
////////////////////////////////

function createWish(quantity) {
    for(let i = 0; i < quantity; i++) {
        const wish = document.createElement("div");
        wish.classList.add('wish')
        wish.style.left = `${getRandomY()}px`
        wish.style.top = `${getRandomX()}px`
        shootingstars.appendChild(wish)
    }
} createWish(60) // create 60 divs to be turned into shooting stars

// animate the shooting stars
anime({
    targets: [".wish"],
    easing: "linear",
    loop: true,
    delay: (el, i) => 1000 * i,
    opacity: [
        {
        duration: 100,
        value: "1"
        }
    ],
    width: [
        {
        value: "150px"
        },
        {
        value: "0px"
        }
    ],
    translateX: 350,
});

//////////////////////
// OTHER ANIMATIONS //
//////////////////////

// planet title text animation. Thanks to https://tobiasahlin.com/moving-letters/#7
export function standupLettersAnim(textWrapper, targetClass) {
    // targetClass parameter must NOT have a period first
    // Wrap every letter in a span
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, `<span class="${targetClass}">$&</span>`);
    anime({
      targets: `.${targetClass}`,
      translateY: ["1.1em", 0],
      translateX: ["0.55em", 0],
      translateZ: 0,
      rotateZ: [180, 0],
      duration: 750,
      easing: "easeOutExpo",
      delay: (el, i) => 50 * i,
    })
  }
  
  export function roundNumbersAnim(target) {
    anime({
      targets: target,
      innerHTML: [0, target.innerHTML],
      easing: 'linear',
      round: 1 // Will round the animated value to 1 decimal
    });
  }

  export function scaleInAnim(target) {
    if(flyInAnimComplete) {
      anime({
        targets: target,
        scale: [.9, 1],
        duration: 500,
        easing: 'easeOutExpo'
      });
    }
  }
  
  // Used for the mobile menu when it opens
  export function staggerLeftAnim(target) {
    anime({
      targets: target,
      translateX: [-270, 0],
      delay: anime.stagger(50), // increase delay by 100ms for each elements.
    });
  }
  
  export let flyInAnimComplete = false // prevent other animations from interrupting
  export function flyInAnim(target) {
    flyInAnimComplete = false
    anime({
      targets: target,
      translateX: [
        { value: -2000, duration: 0, delay: 0 },
        { value: 0, duration: 1000, delay: 0 },
      ],
      translateY: [
        { value: 2000, duration: 0, delay: 0 },
        { value: 0, duration: 1000, delay: 0 },
      ],
      scale: [
        { value: 4, duration: 100, delay: 0, easing: 'easeOutExpo' },
        { value: 1, duration: 900 },
      ],
      easing: 'easeOutElastic(1, .8)',
      loop: false,
      complete: () => {
        flyInAnimComplete = true
      }
    });
  }
  
  export function flyOutAnim(target) {
    flyInAnimComplete = false
    anime({
      targets: target,
      translateX: [ // fly out
        { value: 0, duration: 0, delay: 0 },
        { value: 200, duration: 1000, delay: 0 },
      ],
      translateY: [
        { value: 0, duration: 0, delay: 0 },
        { value: -200, duration: 1000, delay: 0 },
      ],
      scale: [
        { value: 0, duration: 200, delay: 0, easing: 'easeOutExpo' },
      ],
      backgroundColor: 'white',
      easing: 'easeOutElastic(1, .8)',
      loop: false,
      complete: () => {
        flyInAnimComplete = true
        resetAnim(target)
        flyInAnim(target)
        planetImg.src=`assets/planet-${currentPlanet.planetName}.svg` // change the planet image
        planetImg.classList.remove(previousPlanet.planetName)
        planetImg.classList.add(currentPlanet.planetName)
      }
    })
  }

// resets an objects transform to default to avoid animation bugs
export function resetAnim(target) {
    target.style.transform = 'none'
}

// autoplay animations on load
function initAnimations() {
    standupLettersAnim(standupTextWrapper, 'animLetter')
    roundNumbersAnim(statValues)
    flyInAnim(planetImg)
} initAnimations()