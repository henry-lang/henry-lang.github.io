const calendar = document.querySelector('.calendar')
const monthDisplay = document.querySelector('.calendar-month')
let selection = new Date()
let days = calculateDays(selection)
let dayElems = new Array(6 * 7)

for(let i = 0; i < 42; i++) {
    const elem = document.createElement('li')
    elem.classList.add('calendar-day')
    calendar.appendChild(elem)
    dayElems[i] = elem
}

render()

function calculateDays(first) {
    first.setDate(1)
    const year = first.getFullYear()
    const month = first.getMonth()
    let day = first.getDay() ?? 7

    first = new Date(year, month, 1 - day)
    const days = new Array(42);
    for(let i = 0; i < 42; i++){
        const date = first.getDate()
        const dateStr = first.toLocaleDateString('en-US', { // you can use undefined as first argument
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        days[i] = {
            date: new Date(first),
            dateStr,
        };
        first.setDate(date + 1)
    }
    return days
}

function render() {
    const month = selection.getMonth()

    monthDisplay.innerText = selection.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    })

    days.forEach((day, i) => {
        const element = dayElems[i]
        if(day.dateStr in diaryEntries) {
            element.innerHTML = `<a href="${diaryEntries[day.dateStr].url}">${days[i].date.getDate()}</a>`
        } else {
            element.innerText = days[i].date.getDate()
        }
        if(day.date.getMonth() !== month) {
            element.classList.add("outmonth")
        } else {
            element.classList.remove("outmonth")
        }
    })
}

document.querySelector('.calendar-backwards').addEventListener('click', () => {
    selection.setMonth(selection.getMonth() - 1)
    days = calculateDays(selection)
    render()
})

document.querySelector('.calendar-forwards').addEventListener('click', () => {
    selection.setMonth(selection.getMonth() + 1)
    days = calculateDays(selection)
    render()
})