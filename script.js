document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("time-grid");
    const prevDayBtn = document.getElementById("prev-day");
    const nextDayBtn = document.getElementById("next-day");
    const dateDisplay = document.getElementById("date-display");
    const clearBtn = document.getElementById("clear");

    const popup = document.getElementById("popup");
    const popupTime = document.getElementById("popup-time");
    const labelInput = document.getElementById("label-input");
    const colorInput = document.getElementById("color-input");
    const saveBtn = document.getElementById("save-btn");
    const cancelBtn = document.getElementById("cancel-btn");

    let currentDate = new Date().toISOString().split("T")[0];
    let selectedSlot = null;

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
        const savedData = JSON.parse(localStorage.getItem(currentDate)) || {};
        document.querySelectorAll(".time-slot").forEach(slot => {
            if (savedData[slot.dataset.time]) {
                slot.style.backgroundColor = savedData[slot.dataset.time].color;
                slot.textContent = `${slot.dataset.time}\n${savedData[slot.dataset.time].label}`;
            }
            slot.addEventListener("click", () => openPopup(slot));
        });
    }

    function openPopup(slot) {
        selectedSlot = slot;
        popup.style.display = "block";
        popupTime.textContent = `Editing: ${slot.dataset.time}`;
        labelInput.value = slot.textContent.split("\n")[1] || "";
    }

    function saveToLocalStorage() {
        const savedData = JSON.parse(localStorage.getItem(currentDate)) || {};
        if (selectedSlot) {
            const label = labelInput.value;
            const color = colorInput.value;
            savedData[selectedSlot.dataset.time] = { label, color };
            localStorage.setItem(currentDate, JSON.stringify(savedData));

            selectedSlot.style.backgroundColor = color;
            selectedSlot.textContent = `${selectedSlot.dataset.time}\n${label}`;
            popup.style.display = "none";
        }
    }

    updateDateDisplay();
    generateGrid();
});
