'use strict'

function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

// Initial ascii stuff (Look, I don't like creating a temporary canvas either, but...)
const asciiStyle = getComputedStyle(document.querySelector('.ascii'))
const globalFont = asciiStyle.font
const globalFontSize = asciiStyle.fontSize
const globalFontFamily = asciiStyle.fontFamily
let context = document.createElement('canvas').getContext('2d')
context.font = globalFont
const charDimensions = context.measureText('.') // Monospace font assumed
const charWidth = charDimensions.width
const charHeight = charDimensions.fontBoundingBoxAscent
console.log(`Using font: ${context.font}`)
console.log(`Found ascii char width: ${charWidth}px, ascii char height: ${charHeight}px`)
context = null;

const screenWidthChars = Math.floor(window.innerWidth / charWidth);
const screenHeightChars = Math.floor(window.innerHeight / charHeight);

const seaElement = document.querySelector('.sea')
const seaWidth = screenWidthChars
const seaHeight = Math.floor(screenHeightChars / 4)
const seaTPS = 3
const seaText = []
const seaChars = ['~']

const overlay = document.querySelector('.overlay')
const overlayTPS = 1
const overlayChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '#', '$', '^', '.', ',', '%', '$', '$', '.', '.', ',']
const ctx = overlay.getContext('2d')
const scale = window.devicePixelRatio

overlay.width = Math.floor(window.innerWidth * scale)
overlay.height = Math.floor(window.innerHeight * scale)
ctx.font = `${Number(globalFontSize.slice(0, globalFontSize.length - 2)) * 2}px ${globalFontFamily}`
const s = ctx.measureText('.')
const w = s.width
const h = s.fontBoundingBoxAscent
function rgbToHex(color){
    const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
    
    return hex;
}
const fontHex = rgbToHex(asciiStyle.color)
window.setInterval(() => {
    ctx.clearRect(0, 0, overlay.width, overlay.height)
    for(let i = 0; i < overlay.height / h; i++) {
        for(let j = 0; j < overlay.width / w; j++) {
            let alpha = Math.floor(i / (overlay.height / h) * 255).toString(16)
            if(alpha.length == 1) {
                alpha = '0' + alpha
            }
            ctx.fillStyle = `${fontHex}${alpha}`
            ctx.fillText(choose(overlayChars), j * w, (i + 1) * h);
        }
    }
}, 1000/5)

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
