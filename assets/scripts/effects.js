'use strict'

function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}


const context = document.createElement('canvas').getContext('2d')
context.font = getComputedStyle(document.querySelector(".ascii")).font
console.log(context.font)
const charDimensions = context.measureText('.') // Monospace font assumed
const charWidth = charDimensions.width
const charHeight = charDimensions.fontBoundingBoxAscent
console.log(charWidth, charHeight)
// const font = getComputedStyle(document.documentElement).getPropertyValue('--font') + ` ${convertRemToPixels(1.5)}px`
// const temp = document.createElement('span')
// temp.innerText = '.'
// temp.style.font = font
// document.body.appendChild(temp)
// document.body.removeChild(temp);

const seaWidth = window.innerWidth / charWidth
const seaHeight = Math.floor(window.innerHeight / charHeight * .25)
const seaText = []
window.setInterval(() => {
    seaText.length = 0
    for(let i = 0; i < seaHeight; i++) {
        for(let j = 0; j < seaWidth; j++) {
            seaText.push((Math.random() > (i / seaHeight + 0.1)) ? '~' : ' ')
        }
        seaText.push('\n')
    }
    document.querySelector(".sea").innerText = seaText.join('')
}, 1000/3)