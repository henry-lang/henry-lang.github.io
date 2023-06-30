function toFixedTrunc(x, n) {
    const v = (typeof x === 'string' ? x : x.toString()).split('.');
    if (n <= 0) return v[0];
    let f = v[1] || '';
    if (f.length > n) return `${v[0]}.${f.substr(0,n)}`;
    while (f.length < n) f += '0';
    return `${v[0]}.${f}`
}

const decimalDisplay = document.getElementById('decimal-display');
const minusBtn = document.getElementById('minus-btn');
const plusBtn = document.getElementById('plus-btn');

let decimalPlaces = 2; // Default value

minusBtn.addEventListener('click', () => {
    if (decimalPlaces > 0) {
        decimalPlaces--;
        decimalDisplay.innerText = decimalPlaces;
    }
});
plusBtn.addEventListener('click', () => {
    decimalPlaces++;
    decimalDisplay.innerText = decimalPlaces;
});

const display = document.getElementById('display');

const startDate = new Date('2023-06-15T12:30:00');
const endDate = new Date('2023-09-05T08:20:00');

function getPercentage() {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const currentTimestamp = new Date().getTime();

    if (currentTimestamp <= startTimestamp) {
        return 0;
    } else if (currentTimestamp >= endTimestamp) {
        return 100;
    } else {
        const percentage = ((currentTimestamp - startTimestamp) / (endTimestamp - startTimestamp)) * 100;
        return toFixedTrunc(percentage, decimalPlaces); // Round to two decimal places
    }
}

function render() {
    const newP = getPercentage() + '%';
    if(display.innerText != newP) {
        display.innerText = newP;
    }
    window.requestAnimationFrame(render);
}

render();
