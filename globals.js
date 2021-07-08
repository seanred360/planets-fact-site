export const planetImg = document.querySelector('.planet-img')
export const standupTextWrapper = document.querySelector('.animLetters');
export const statValues = document.querySelectorAll('.stat__value')
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