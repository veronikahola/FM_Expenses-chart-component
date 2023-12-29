document.addEventListener("DOMContentLoaded", function () {
    fetchDataAndGenerateChart();
});


async function fetchDataAndGenerateChart() {
    try {
        const response = await fetch("data.json");
        const data = await response.json();

        data.forEach(entry => {
            createBar(entry.day, entry.amount);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function createBar(day, amount) {
    const chartContainer = document.getElementById("chart-container");

    //create bar container
    const barContainer = document.createElement("div");
    barContainer.classList.add("bar-container");

    //create bar
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${amount * 3}px`;

        // change of color dependind on the day
        if (day === currentDay) {
            bar.classList.add('bar--current-day');
        }

    //create amounts
    const amounts = document.createElement("span");
    amounts.classList.add("amounts");
    amounts.classList.add("hidden");
    amounts.textContent = `$${amount}`

    bar.addEventListener('mouseover', function () {
        amounts.classList.remove("hidden");
    });

    bar.addEventListener('mouseout', function () {
        amounts.classList.add("hidden");
    });

    const label = document.createElement("span");
    label.classList.add("label");
    label.textContent = day;

    
    barContainer.appendChild(label);
    barContainer.appendChild(bar);
    bar.appendChild(amounts)
    chartContainer.appendChild(barContainer);
}


function getCurrentDay() {
    const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const currentDate = new Date();
    const currentDayNumber = currentDate.getDay();
    const currentDay = daysOfWeek[currentDayNumber];
    
    return currentDay;
}

const currentDay = getCurrentDay();
console.log(currentDay);

