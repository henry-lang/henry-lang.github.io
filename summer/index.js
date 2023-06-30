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
        return parseFloat(percentage.toFixed(4)); // Round to two decimal places
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
