const toggle = document.querySelector('.toggle') //mobile hamburger button
const toggleItems = document.querySelectorAll('.toggle-item') //mobile menu planet anchor links
const body = document.querySelector('body') // this is to disable scrolling when the mobile menu is open
const menuContent = document.querySelector('.menu__content') // overview structure surface menu
const contentLinks = document.querySelectorAll('.content-link') // overview or structure or surface anchor link
const planetLinks = document.querySelectorAll('.planet-link') // planet named menu anchor links
let currentContent = 'overview'
let previousContent = ''
let currentIndex = 2 // keep track of which planet object in the json file 'planetData' we are accessing
const changePlanet = document.querySelectorAll('.change-planet') // all elements that change based on the currently selected planet
const changeContent = document.querySelectorAll('.change-content') // all elements that change based on overview structure or surface
const planetGeoImg = document.querySelector('.planet-geo-img') // the image that appears when 'surface geology' content is active

import { planetData } from "./globals.js"
import { currentPlanet } from "./globals.js"
import { previousPlanet } from "./globals.js"
import { planetImg } from "./globals.js"
import { statValues } from "./globals.js"
import { standupTextWrapper } from "./globals.js"
import { standupLettersAnim } from "./animations.js"
import { flyOutAnim } from "./animations.js"
import { scaleInAnim } from "./animations.js"
import { roundNumbersAnim } from "./animations.js"
import { flyInAnimComplete } from "./animations.js"
import { staggerLeftAnim } from "./animations.js"


// mobile hamburger button behavior
toggle.addEventListener('click', () => {
    
    body.classList.toggle('noscroll')
    toggle.classList.toggle('toggle-active')
    menuContent.classList.toggle('hide') 

    toggleItems.forEach(ele => { // toggle items are the mobile only links
        ele.classList.toggle('active')
    })
    staggerLeftAnim('.toggle-item')
})

// when we click a link
planetLinks.forEach(link => {
  link.addEventListener('click', () => {
    switchPlanet(link.classList[1], link.classList[2]) // The [2] class must always be the planet name

    if(link.parentElement.classList.contains('toggle-item')) { // if on mobile
      toggle.classList.remove('toggle-active')
      body.classList.toggle('noscroll')
      menuContent.classList.remove('hide')
      toggleItems.forEach(item => { // toggle items are the mobile only links
        item.classList.remove('active') // on mobile, active shows and hides the links
      })
    }

    if(link.parentElement.classList.contains('hide-for-mobile')) {  // if on tablet
      planetLinks.forEach(ele => {     // remove the active class from all links
        ele.classList.remove('active') // on tablet, the active class shows the ::after element with planet specific colors
      })
      link.classList.add('active') // only add active to one link
    }
  })
})

// when we click overview, internal, or surface links
contentLinks.forEach(link => {
    link.addEventListener('click', () => {
      if(flyInAnimComplete) { // cannot click buttons and interfere with the animation and cause bugs
        if(!link.classList.contains('content-active')) // cannot click buttons that are already active
        switchContent(link.classList[1])
        contentLinks.forEach(otherLink => {
            otherLink.classList.remove('content-active')
        })
        link.classList.add('content-active')
      }
    })
})

function switchPlanet(planetName, index) {
  if(planetName === currentPlanet) return null // cannot change to the same planet thats already active
    previousPlanet.planetName = currentPlanet.planetName
    currentPlanet.planetName = planetName;
    currentIndex = index
    flyOutAnim(planetImg)
    switchContent('overview')
    if(currentPlanet.planetName) {
        console.log('The current planet is ' + currentPlanet.planetName)
    } else {
        console.error('ERROR planet name not found. The planet name must be the second class on the planet-links element. Do not remove or change this element.')
    }

    // change each element to match the currently selected planet
    // The planet image is changed by the flyOutAnim() function, not here
    changePlanet.forEach(ele => {
        if(ele.classList.contains('animLetters')) {
            ele.innerHTML = planetData[currentIndex].name
            standupLettersAnim(standupTextWrapper, 'animLetter')
        }
        if(ele.classList.contains('rotation')) {
            ele.innerHTML = planetData[currentIndex].rotation
        }
        if(ele.classList.contains('revolution')) {
            ele.innerHTML = planetData[currentIndex].revolution
        }
        if(ele.classList.contains('radius')) {
            ele.innerHTML = planetData[currentIndex].radius
        }
        if(ele.classList.contains('temperature')) {
            ele.innerHTML = planetData[currentIndex].temperature
        }
    })
    roundNumbersAnim(statValues)

    // change the coloring to match the current planet only if we are not on mobile
    contentLinks.forEach(link => {
      link.classList.remove(previousPlanet.planetName)
      link.classList.add(currentPlanet.planetName)
    })
}

// change all elements related to the currently selected content
function switchContent(content) {
  currentContent = content
  previousContent = currentContent
    changeContent.forEach(ele => {
        switch(content) {
          case 'overview':
            scaleInAnim(planetImg)
            contentLinks.forEach(link => {
                if(link.classList.contains('overview')) {
                    link.classList.add('content-active')
                } else {
                    link.classList.remove('content-active')
                }
            })
            if(ele.classList.contains('planet-img')) { 
                ele.src = planetData[currentIndex].images.planet
                ele.classList.remove(ele.classList[2]) //remove the current planet name class with sizing rules
                ele.classList.add(planetData[currentIndex].name.toLowerCase()) //add the new planet name class. The css styles aren't captialized.
            }
            planetGeoImg.classList.add('hide')
            if(ele.classList.contains('planet__paragraph')) ele.innerHTML = planetData[currentIndex].overview.content
            if(ele.classList.contains('source')) ele.href = planetData[currentIndex].overview.source
          break;
          case 'structure':
            scaleInAnim(planetImg)
            if(ele.classList.contains('planet-img')) { 
                ele.src = planetData[currentIndex].images.internal
            }
            planetGeoImg.classList.add('hide')
            if(ele.classList.contains('planet__paragraph')) ele.innerHTML = planetData[currentIndex].structure.content
            if(ele.classList.contains('source')) ele.href = planetData[currentIndex].structure.source
          break;
          case 'geology':
            scaleInAnim(planetGeoImg)
            if(ele.classList.contains('planet-img')) { 
                ele.src = planetData[currentIndex].images.planet
            }
            planetGeoImg.src = planetData[currentIndex].images.geology
            planetGeoImg.classList.remove('hide')
            if(ele.classList.contains('planet__paragraph')) ele.innerHTML = planetData[currentIndex].geology.content
            if(ele.classList.contains('source')) ele.href = planetData[currentIndex].geology.source
          break;
        }
    })
}