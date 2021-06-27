const toggle = document.querySelector('.toggle')
const toggleItem = document.querySelectorAll('.toggle-item')
const body = document.querySelector('body')
const menuDetails = document.querySelector('.menu__details')

toggle.addEventListener('click', () => {
    
    body.classList.toggle('noscroll')
    toggle.classList.toggle('toggle-active')
    menuDetails.classList.toggle('hide')

    toggleItem.forEach(ele => {
        ele.classList.toggle('active')
    })
})