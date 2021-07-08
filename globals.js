export const planetImg = document.querySelector('.planet-img') // The planet image
export const standupTextWrapper = document.querySelector('.animLetters'); // The planet name header
export const statValues = document.querySelectorAll('.stat__value') //displayed in boxes at the bottom of the page
export const currentPlanet = {
    planetName: 'earth',
    get name() {
        return this.planet
    },
    set name(inputName) {
        this.planetName = inputName
        console.log('The current planet is ' + this.planetName)
    }
}

export const previousPlanet = {
    planetName: '',
    get name() {
        return this.planet
    },
    set name(inputName) {
        this.planetName = inputName
        console.log('The current planet is ' + this.planetName)
    }
}

export let planetData    
fetch('/data.json').then(
        function(u){ return u.json();}
      ).then(
        function(json){
          planetData = json;
        }
      )
