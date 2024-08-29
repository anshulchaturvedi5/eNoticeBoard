// DOM elements
const form = document.getElementById('new-opportunity-form');
const opportunitiesContainer = document.getElementById('opportunities-container');

// Issue array to store all opportunity
let opportunities = JSON.parse(localStorage.getItem('opportunities')) || [];

// Function to render opportunities
function renderOpportunities() {
    opportunitiesContainer.innerHTML = '';
    opportunities.forEach((opportunity, index) => {
        const opportunityElement = document.createElement('div');
        opportunityElement.classList.add('opportunity');
        opportunityElement.innerHTML = `
            <h3>${opportunity.title}</h3>
            <p>${opportunity.description}</p>
            <div class="opportunity-meta">
                <span>Created: ${new Date(opportunity.created).toLocaleString()}</span>
                <a href="https://hyperverge.co/in/" target="blank" > <button class="pickup-btn" data-index="${index}">Have a Go</button> </a>
            </div>
        `;
        opportunitiesContainer.appendChild(opportunityElement);
    });
}

// Function to add a new issue
function addOpportunity(e) {
    e.preventDefault();
    const title = document.getElementById('opportunity-title').value;
    const description = document.getElementById('opportunity-description').value;
    
    const newOpportunity = {
        title,
        description,
        created: new Date().getTime()
    };
    
    opportunities.push(newOpportunity);
    localStorage.setItem('opportunities', JSON.stringify(opportunities));
    renderOpportunities();
    form.reset();
}

form.addEventListener('submit', addOpportunity);

// Initial render
renderOpportunities();