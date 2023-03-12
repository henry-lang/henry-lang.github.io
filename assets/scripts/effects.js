function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const font = getComputedStyle(document.documentElement).getPropertyValue('--font') + `${convertRemToPixels(1.5)}px`
const temp = document.createElement('span')
temp.innerText = '.'
temp.style.font = font
document.body.appendChild(temp)
const charWidth = temp.offsetWidth;
const charHeight = temp.offsetHeight;
document.body.removeChild(temp);

console.log(charWidth)
console.log(charHeight)