document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("time-grid");
    const prevDayBtn = document.getElementById("prev-day");
    const nextDayBtn = document.getElementById("next-day");
    const dateDisplay = document.getElementById("date-display");
    const clearBtn = document.getElementById("clear");

    let currentDate = new Date().toISOString().split("T")[0];

    function generateGrid() {
        grid.innerHTML = "";
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
            times.push(`${String(hour).padStart(2, "0")}:00`);
            times.push(`${String(hour).padStart(2, "0")}:30`);
        }

        times.forEach(time => {
            const div = document.createElement("div");
            div.classList.add("time-slot");
            div.textContent = time;
            div.dataset.time = time;
            grid.appendChild(div);
        });

        loadFromLocalStorage();
    }

    function loadFromLocalStorage() {
        const savedData = JSON.parse(localStorage.getItem(currentDate)) || [];
        document.querySelectorAll(".time-slot").forEach(slot => {
            if (savedData.includes(slot.dataset.time)) {
                slot.classList.add("active");
            }
            slot.addEventListener("click", () => toggleSlot(slot));
        });
    }

    function toggleSlot(slot) {
        slot.classList.toggle("active");
        saveToLocalStorage();
    }

    function saveToLocalStorage() {
        const activeSlots = Array.from(document.querySelectorAll(".time-slot.active"))
            .map(slot => slot.dataset.time);
        localStorage.setItem(currentDate, JSON.stringify(activeSlots));
    }

    function updateDateDisplay() {
        dateDisplay.textContent = new Date(currentDate).toDateString();
    }

    prevDayBtn.addEventListener("click", () => {
        currentDate = new Date(new Date(currentDate).setDate(new Date(currentDate).getDate() - 1))
            .toISOString().split("T")[0];
        updateDateDisplay();
        generateGrid();
    });

    nextDayBtn.addEventListener("click", () => {
        currentDate = new Date(new Date(currentDate).setDate(new Date(currentDate).getDate() + 1))
            .toISOString().split("T")[0];
        updateDateDisplay();
        generateGrid();
    });

    clearBtn.addEventListener("click", () => {
        localStorage.removeItem(currentDate);
        generateGrid();
    });

    updateDateDisplay();
    generateGrid();
});
