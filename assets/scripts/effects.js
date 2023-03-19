'use strict'

// Initial ascii stuff (Look, I don't like creating a temporary canvas either, but...)

const context = document.createElement('canvas').getContext('2d')
context.font = getComputedStyle(document.querySelector('.ascii')).font
const charDimensions = context.measureText('.') // Monospace font assumed
const charWidth = charDimensions.width
const charHeight = charDimensions.fontBoundingBoxAscent
console.log(`Using font: ${context.font}`)
console.log(`Found ascii char width: ${charWidth}px, ascii char height: ${charHeight}px`)

const seaElement = document.querySelector('.sea')
const seaWidth = Math.floor(window.innerWidth / charWidth);
const seaHeight = Math.floor(window.innerHeight / charHeight * .25)
const seaTPS = 3;
const seaText = []
const seaChars = ['~']

function setOptimizedInterval(element, render, tps) {
    render()
    let handle = setInterval(render, 1000 / tps)
    new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.intersectionRatio >= 0.05) {
                if(handle === null) {
                    console.log('Show animation on', element)
                    handle = setInterval(render, 1000 / tps)
                }
            } else if(handle != null) {
                console.log('Hide animation on', element)
                clearInterval(handle)
                handle = null
            }
        })
    }, {
        root: null,
        rootMargin: '0px',
        threshold: [0.05, 0.06],
    }).observe(element)
}

function randomSeaChar() {
    return seaChars[Math.floor(Math.random() * seaChars.length)]
}

function updateSea() {
    seaText.length = 0
    for(let i = 0; i < seaHeight; i++) {
        for(let j = 0; j < seaWidth; j++) {
            seaText.push((Math.random() > (0.9 * i / seaHeight + 0.1)) ? randomSeaChar() : ' ')
        }
        seaText.push('\n')
    }

    seaElement.innerText = seaText.join('')
}

setOptimizedInterval(seaElement, updateSea, seaTPS)