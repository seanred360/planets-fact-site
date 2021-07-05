const toggle = document.querySelector('.toggle') //mobile hamburger button
const toggleItems = document.querySelectorAll('.toggle-item') //mobile menu planet anchor links
const body = document.querySelector('body') // this is to disable scrolling when the mobile menu is open
const menuContent = document.querySelector('.menu__content') // overview structure surface menu
const contentLinks = document.querySelectorAll('.content-link') // overview or structure or surface anchor link
const planetLinks = document.querySelectorAll('.planet-link') // planet named menu anchor links
let currentPlanet = 'earth'
let previousPlanet = '' // we use this to remove color classes before we change to the new planets color scheme
let currentContent = 'overview'
let previousContent = ''
let currentIndex = 2 // keep track of which planet object in the json file 'planetData' we are accessing
const changePlanet = document.querySelectorAll('.change-planet') // all elements that change based on the currently selected planet
const changeContent = document.querySelectorAll('.change-content') // all elements that change based on overview structure or surface
const planetImg = document.querySelector('.planet-img')
const planetGeoImg = document.querySelector('.planet-geo-img') // the image that appears when 'surface geology' content is active
const planetData = {
    planets: [
        {
          "name": "Mercury",
          "overview": {
            "content": "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. Mercury is one of four terrestrial planets in the Solar System, and is a rocky body like Earth.",
            "source": "https://en.wikipedia.org/wiki/Mercury_(planet)"
          },
          "structure": {
            "content": "Mercury appears to have a solid silicate crust and mantle overlying a solid, iron sulfide outer core layer, a deeper liquid core layer, and a solid inner core. The planet's density is the second highest in the Solar System at 5.427 g/cm3 , only slightly less than Earth's density.",
            "source": "https://en.wikipedia.org/wiki/Mercury_(planet)#Internal_structure"
          },
          "geology": {
            "content": "Mercury's surface is similar in appearance to that of the Moon, showing extensive mare-like plains and heavy cratering, indicating that it has been geologically inactive for billions of years. It is more heterogeneous than either Mars's or the Moon’s.",
            "source": "https://en.wikipedia.org/wiki/Mercury_(planet)#Surface_geology"
          },
          "rotation": "58.6 Days",
          "revolution": "87.97 Days",
          "radius": "2,439.7 KM",
          "temperature": "430°c",
          "images": {
            "planet": "./assets/planet-mercury.svg",
            "internal": "./assets/planet-mercury-internal.svg",
            "geology": "./assets/geology-mercury.png"
          }
        },
        {
          "name": "Venus",
          "overview": {
            "content": "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be, on rare occasions, visible to the naked eye in broad daylight.",
            "source": "https://en.wikipedia.org/wiki/Venus"
          },
          "structure": {
            "content": "The similarity in size and density between Venus and Earth suggests they share a similar internal structure: a core, mantle, and crust. Like that of Earth, Venusian core is most likely at least partially liquid because the two planets have been cooling at about the same rate.",
            "source": "https://en.wikipedia.org/wiki/Venus#Internal_structure"
          },
          "geology": {
            "content": "Much of the Venusian surface appears to have been shaped by volcanic activity. Venus has several times as many volcanoes as Earth, and it has 167 large volcanoes that are over 100 km (60 mi) across. The only volcanic complex of this size on Earth is the Big Island of Hawaii.",
            "source": "https://en.wikipedia.org/wiki/Venus#Surface_geology"
          },
          "rotation": "243 Days",
          "revolution": "224.7 Days",
          "radius": "6,051.8 KM",
          "temperature": "471°c",
          "images": {
            "planet": "./assets/planet-venus.svg",
            "internal": "./assets/planet-venus-internal.svg",
            "geology": "./assets/geology-venus.png"
          }
        },
        {
          "name": "Earth",
          "overview": {
            "content": "Third planet from the Sun and the only known planet to harbor life. About 29.2% of Earth's surface is land with remaining 70.8% is covered with water. Earth's distance from the Sun, physical properties and geological history have allowed life to evolve and thrive.",
            "source": "https://en.wikipedia.org/wiki/Earth"
          },
          "structure": {
            "content": "Earth's interior, like that of the other terrestrial planets, is divided into layers by their chemical or physical (rheological) properties. The outer layer is a chemically distinct silicate solid crust, which is underlain by a highly viscous solid mantle.",
            "source": "https://en.wikipedia.org/wiki/Earth#Internal_structure"
          },
          "geology": {
            "content": "The total surface area of Earth is about 510 million km2. The continental crust consists of lower density material such as the igneous rocks granite and andesite. Less common is basalt, a denser volcanic rock that is the primary constituent of the ocean floors.",
            "source": "https://en.wikipedia.org/wiki/Earth#Surface"
          },
          "rotation": "0.99 Days",
          "revolution": "365.26 Days",
          "radius": "6,371 KM",
          "temperature": "16°c",
          "images": {
            "planet": "./assets/planet-earth.svg",
            "internal": "./assets/planet-earth-internal.svg",
            "geology": "./assets/geology-earth.png"
          }
        },
        {
          "name": "Mars",
          "overview": {
            "content": "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the \"Red Planet\".",
            "source": "https://en.wikipedia.org/wiki/Mars"
          },
          "structure": {
            "content": "Like Earth, Mars has differentiated into a dense metallic core overlaid by less dense materials. Scientists initially determined that the core is at least partially liquid. Current models of its interior imply a core consisting primarily of iron and nickel with about 16–17% sulfur.",
            "source": "https://en.wikipedia.org/wiki/Mars#Internal_structure"
          },
          "geology": {
            "content": "Mars is a terrestrial planet whose surface consists of minerals containing silicon and oxygen, metals, and other elements that typically make up rock. The surface is primarily composed of tholeiitic basalt, although parts are more silica-rich than typical basalt.",
            "source": "https://en.wikipedia.org/wiki/Mars#Surface_geology"
          },
          "rotation": "1.03 Days",
          "revolution": "1.88 Years",
          "radius": "3,389.5 KM",
          "temperature": "-28°c",
          "images": {
            "planet": "./assets/planet-mars.svg",
            "internal": "./assets/planet-mars-internal.svg",
            "geology": "./assets/geology-mars.png"
          }
        },
        {
          "name": "Jupiter",
          "overview": {
            "content": "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass two and a half times that of all the other planets in the Solar System combined, but less than one-thousandth the mass of the Sun.",
            "source": "https://en.wikipedia.org/wiki/Jupiter"
          },
          "structure": {
            "content": "When the Juno arrived in 2016, it found that Jupiter has a very diffuse core that mixes into its mantle. A possible cause is an impact from a planet of about ten Earth masses a few million years after Jupiter's formation, which would have disrupted an originally solid Jovian core.",
            "source": "https://en.wikipedia.org/wiki/Jupiter#Internal_structure"
          },
          "geology": {
            "content": "The best known feature of Jupiter is the Great Red Spot, a persistent anticyclonic storm located 22° south of the equator. It is known to have existed since at least 1831, and possibly since 1665.",
            "source": "https://en.wikipedia.org/wiki/Jupiter#Great_Red_Spot_and_other_vortices"
          },
          "rotation": "9.93 Hours",
          "revolution": "11.86 Years",
          "radius": "69,911 KM",
          "temperature": "-108°c",
          "images": {
            "planet": "./assets/planet-jupiter.svg",
            "internal": "./assets/planet-jupiter-internal.svg",
            "geology": "./assets/geology-jupiter.png"
          }
        },
        {
          "name": "Saturn",
          "overview": {
            "content": "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It only has one-eighth the average density of Earth.",
            "source": "https://en.wikipedia.org/wiki/Saturn"
          },
          "structure": {
            "content": "Despite consisting mostly of hydrogen and helium, most of Saturn's mass is not in the gas phase, because hydrogen becomes a non-ideal liquid when the density is above 0.01 g/cm3, which is reached at a radius containing 99.9% of Saturn's mass.",
            "source": "https://en.wikipedia.org/wiki/Saturn#Internal_structure"
          },
          "geology": {
            "content": "The outer atmosphere of Saturn contains 96.3% molecular hydrogen and 3.25% helium by volume. The planet's most famous feature is its prominent ring system, which is composed mostly of ice particles with a smaller amount of rocky debris and dust.",
            "source": "https://en.wikipedia.org/wiki/Saturn#Atmosphere"
          },
          "rotation": "10.8 Hours",
          "revolution": "29.46 Years",
          "radius": "58,232 KM",
          "temperature": "-138°c",
          "images": {
            "planet": "./assets/planet-saturn.svg",
            "internal": "./assets/planet-saturn-internal.svg",
            "geology": "./assets/geology-saturn.png"
          }
        },
        {
          "name": "Uranus",
          "overview": {
            "content": "Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus according to Greek mythology, was the great-grandfather of Ares. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.",
            "source": "https://en.wikipedia.org/wiki/Uranus"
          },
          "structure": {
            "content": "The standard model of Uranus's structure is that it consists of three layers: a rocky (silicate/iron–nickel) core in the centre, an icy mantle in the middle and an outer gaseous hydrogen/helium envelope. The core is relatively small, with a mass of only 0.55 Earth masses.",
            "source": "https://en.wikipedia.org/wiki/Uranus#Internal_structure"
          },
          "geology": {
            "content": "The composition of Uranus's atmosphere is different from its bulk, consisting mainly of molecular hydrogen and helium. The helium molar fraction, i.e. the number of helium atoms per molecule of gas, is 0.15±0.03 in the upper troposphere.",
            "source": "https://en.wikipedia.org/wiki/Uranus#Atmosphere"
          },
          "rotation": "17.2 Hours",
          "revolution": "84 Years",
          "radius": "25,362 KM",
          "temperature": "-195°c",
          "images": {
            "planet": "./assets/planet-uranus.svg",
            "internal": "./assets/planet-uranus-internal.svg",
            "geology": "./assets/geology-uranus.png"
          }
        },
        {
          "name": "Neptune",
          "overview": {
            "content": "Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, more massive than its near-twin Uranus.",
            "source": "https://en.wikipedia.org/wiki/Neptune"
          },
          "structure": {
            "content": "Neptune's internal structure resembles that of Uranus. Its atmosphere forms about 5% to 10% of its mass and extends perhaps 10% to 20% of the way towards the core. Increasing concentrations of methane, ammonia and water are found in the lower regions.",
            "source": "https://en.wikipedia.org/wiki/Neptune#Internal_structure"
          },
          "geology": {
            "content": "Neptune's atmosphere is 80% hydrogen and 19% helium. A trace amount of methane is also present. Prominent absorption bands of methane exist at wavelengths above 600 nm, in the red and infrared portion of the spectrum.",
            "source": "https://en.wikipedia.org/wiki/Neptune#Atmosphere"
          },
          "rotation": "16.08 Hours",
          "revolution": "164.79 Years",
          "radius": "24,622 KM",
          "temperature": "-201°c",
          "images": {
            "planet": "./assets/planet-neptune.svg",
            "internal": "./assets/planet-neptune-internal.svg",
            "geology": "./assets/geology-neptune.png"
          }
        }
      ]
}

///////////////////////////////////////////////////////////////////////////////
// ANIMATION SECTION
///////////////////////////////////////////////////////////////////////////////

// animation elements
let standupTextWrapper = document.querySelector('.animLetters');
const statValues = document.querySelectorAll('.stat__value')
const header = document.querySelector(".header");

///////////////////////////////////////////////////
// BACKGROUND ANIMATIONS
// https://codepen.io/sharnajh/pen/WNvppRy?editors=0110 shooting star background idea from here
///////////////////////////////////////////////////

const shootingstars = document.createElement("div");
shootingstars.classList.add('shootingstars')
document.body.insertBefore(shootingstars, header);
createWish(60) // create 60 divs to be turned into shooting stars

function createWish(quantity) {
  randomRadius = () => {
    return Math.random() * 0.7 + 0.6;
  };
  getRandomX = () => {
    return Math.floor(Math.random() * Math.floor(window.innerWidth)).toString();
  };
  getRandomY = () => {
    return Math.floor(Math.random() * Math.floor(window.innerHeight)).toString();
  };

  for(let i = 0; i < quantity; i++) {
    const wish = document.createElement("div");
    wish.classList.add('wish')
    wish.style.left = `${this.getRandomY()}px`
    wish.style.top = `${this.getRandomX()}px`
    shootingstars.appendChild(wish)
  }
}

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
///////////////////////////////////////////////
// END OF BACKGROUND ANIMATION SECTION/////////
///////////////////////////////////////////////


// planet title text animation. Thanks to https://tobiasahlin.com/moving-letters/#7
function standupLettersAnim(textWrapper, targetClass) {
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

function roundNumbersAnim(target) {
  anime({
    targets: target,
    innerHTML: [0, target.innerHTML],
    easing: 'linear',
    round: 1 // Will round the animated value to 1 decimal
  });
}

function scaleInAnim(target) {
  if(flyInAnimComplete) {
    anime({
      targets: target,
      scale: [.5, 1],
      duration: 500,
      easing: 'easeOutExpo'
    });
  }
}

// Used for the mobile menu when it opens
function staggerLeftAnim(target) {
  anime({
    targets: target,
    translateX: [-270, 0],
    delay: anime.stagger(50), // increase delay by 100ms for each elements.
  });
}

let flyInAnimComplete = false // prevent other animations from interrupting
function flyInAnim(target) {
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

function flyOutAnim(target) {
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
      planetImg.src=`assets/planet-${currentPlanet}.svg` // change the planet image
      planetImg.classList.remove(previousPlanet)
      planetImg.classList.add(currentPlanet)
    }
  })
}

// resets an objects transform to default to avoid animation bugs
function resetAnim(target) {
  target.style.transform = 'none'
}

// autoplay animations on load
function initAnimations() {
  standupLettersAnim(standupTextWrapper, 'animLetter')
  roundNumbersAnim(statValues)
  flyInAnim(planetImg)
}
initAnimations()

////////////////////////////////////////////////////////////////////////////////////
// END OF ANIMATION SECTION
////////////////////////////////////////////////////////////////////////////////////

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
    switchPlanet(link.classList[1], link.classList[2]) // The [1] class must always be the planet name

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
    previousPlanet = currentPlanet
    currentPlanet = planetName;
    currentIndex = index
    flyOutAnim(planetImg)
    switchContent('overview')
    if(planetName) {
        console.log('The current planet is ' + currentPlanet + currentIndex)
    } else {
        console.error('ERROR planet name not found. The planet name must be the second class on the planet-links element. Do not remove or change this element.')
    }

    // change each element to match the currently selected planet
    // The planet image is changed by the flyOutAnim() function, not here
    changePlanet.forEach(ele => {
        if(ele.classList.contains('animLetters')) {
            ele.innerHTML = planetData.planets[currentIndex].name
            standupLettersAnim(standupTextWrapper, 'animLetter')
        }
        if(ele.classList.contains('rotation')) {
            ele.innerHTML = planetData.planets[currentIndex].rotation
        }
        if(ele.classList.contains('revolution')) {
            ele.innerHTML = planetData.planets[currentIndex].revolution
        }
        if(ele.classList.contains('radius')) {
            ele.innerHTML = planetData.planets[currentIndex].radius
        }
        if(ele.classList.contains('temperature')) {
            ele.innerHTML = planetData.planets[currentIndex].temperature
        }
    })
    roundNumbersAnim(statValues)

    // change the coloring to match the current planet only if we are not on mobile
    contentLinks.forEach(link => {
        if(!link.classList.contains('mobile')) {
            link.classList.remove(previousPlanet)
            link.classList.add(currentPlanet)
        }
    })
}

planetParagraph = document.querySelector('.planet__paragraph')
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
                ele.src = planetData.planets[currentIndex].images.planet
                ele.classList.remove(ele.classList[2]) //remove the current planet name class with sizing rules
                ele.classList.add(planetData.planets[currentIndex].name.toLowerCase()) //add the new planet name class. The css styles aren't captialized.
            }
            planetGeoImg.classList.add('hide')
            if(ele.classList.contains('planet__paragraph')) ele.innerHTML = planetData.planets[currentIndex].overview.content
            if(ele.classList.contains('source')) ele.href = planetData.planets[currentIndex].overview.source
          break;
          case 'structure':
            scaleInAnim(planetImg)
            if(ele.classList.contains('planet-img')) { 
                ele.src = planetData.planets[currentIndex].images.internal
            }
            planetGeoImg.classList.add('hide')
            if(ele.classList.contains('planet__paragraph')) ele.innerHTML = planetData.planets[currentIndex].structure.content
            if(ele.classList.contains('source')) ele.href = planetData.planets[currentIndex].structure.source
          break;
          case 'geology':
            scaleInAnim(planetGeoImg)
            if(ele.classList.contains('planet-img')) { 
                ele.src = planetData.planets[currentIndex].images.planet
            }
            planetGeoImg.src = planetData.planets[currentIndex].images.geology
            planetGeoImg.classList.remove('hide')
            if(ele.classList.contains('planet__paragraph')) ele.innerHTML = planetData.planets[currentIndex].geology.content
            if(ele.classList.contains('source')) ele.href = planetData.planets[currentIndex].geology.source
          break;
        }
    })
}