const leadForm = document.getElementById("leadForm");
const leadList = document.getElementById("leadList");
loadLeads();
leadForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const source = document.getElementById("source").value;
    const lead = {
        name: name,
        email: email,
        source: source
    };
    await fetch("/api/leads", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(lead)
    });
    leadForm.reset();
    loadLeads();
});
async function loadLeads() {
    const response = await fetch("/api/leads");
    const leads = await response.json();
    leadList.innerHTML = "";
    leads.forEach(lead => {
        const card = document.createElement("div");
        card.className = "lead-card";
        card.innerHTML = `
            <h3>${lead.name}</h3>
            <p><strong>Email:</strong> ${lead.email}</p>
            <p><strong>Source:</strong> ${lead.source}</p>
            <label><strong>Status:</strong></label>
            <select
                class="status"
                onchange="updateStatus('${lead._id}', this.value)"
            >
                <option value="New"
                    ${lead.status === "New" ? "selected" : ""}>
                    New
                </option>
                <option value="Contacted"
                    ${lead.status === "Contacted" ? "selected" : ""}>
                    Contacted
                </option>
                <option value="Converted"
                    ${lead.status === "Converted" ? "selected" : ""}>
                    Converted
                </option>
            </select>
            <textarea
                class="notes"
                placeholder="Add notes..."
                onchange="updateNotes('${lead._id}', this.value)"
            >${lead.notes}</textarea>
            <button
                class="delete-btn"
                onclick="deleteLead('${lead._id}')"
            >
                Delete
            </button>
        `;
        leadList.appendChild(card);
    });
}
async function updateStatus(id, status) {
    await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: status
        })
    });
}
async function updateNotes(id, notes) {
    await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            notes: notes
        })
    });
}
async function deleteLead(id) {
    if (!confirm("Are you sure you want to delete this lead?")) {
        return;
    }
    await fetch(`/api/leads/${id}`, {
        method: "DELETE"
    });
    loadLeads();
}