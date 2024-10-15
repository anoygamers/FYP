document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("eventModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const addEventBtn = document.getElementById("addEventBtn");
    const eventTableBody = document.getElementById("eventTableBody");

    openModalBtn.onclick = function () {
        modal.style.display = "flex";
    };

    closeModalBtn.onclick = function () {
        modal.style.display = "none";
    };

    addEventBtn.onclick = function () {
        const eventName = document.getElementById("eventName").value;
        const eventDate = document.getElementById("eventDate").value;
        const eventLocation = document.getElementById("eventLocation").value;

        if (eventName && eventDate && eventLocation) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${eventName}</td>
                <td>${eventDate}</td>
                <td>${eventLocation}</td>
                <td><button class="delete-btn">Delete</button></td>
            `;
            eventTableBody.appendChild(newRow);

            modal.style.display = "none";

            // Clear inputs
            document.getElementById("eventName").value = "";
            document.getElementById("eventDate").value = "";
            document.getElementById("eventLocation").value = "";
        }
    };

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const row = event.target.closest("tr");
            row.remove();
        }
    });
});
