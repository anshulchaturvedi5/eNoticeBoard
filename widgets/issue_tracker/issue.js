// DOM elements
const form = document.getElementById('new-issue-form');
const issuesContainer = document.getElementById('issues-container');

// Issue array to store all issues
let issues = JSON.parse(localStorage.getItem('issues')) || [];

// Function to render issues
function renderIssues() {
    issuesContainer.innerHTML = '';
    issues.forEach((issue, index) => {
        const issueElement = document.createElement('div');
        issueElement.classList.add('issue');
        issueElement.innerHTML = `
            <h3>${issue.title}</h3>
            <p>${issue.description}</p>
            <div class="issue-meta">
                <span class="issue-priority priority-${issue.priority}">${issue.priority}</span>
                <span>Created: ${new Date(issue.created).toLocaleString()}</span>
                <button class="close-btn" data-index="${index}">Close</button>
            </div>
        `;
        issuesContainer.appendChild(issueElement);
    });
}

// Function to add a new issue
function addIssue(e) {
    e.preventDefault();
    const title = document.getElementById('issue-title').value;
    const description = document.getElementById('issue-description').value;
    const priority = document.getElementById('issue-priority').value;
    
    const newIssue = {
        title,
        description,
        priority,
        created: new Date().getTime()
    };
    
    issues.push(newIssue);
    localStorage.setItem('issues', JSON.stringify(issues));
    renderIssues();
    form.reset();
}

// Function to close an issue
function closeIssue(index) {
    issues.splice(index, 1);
    localStorage.setItem('issues', JSON.stringify(issues));
    renderIssues();
}

// Event listeners
form.addEventListener('submit', addIssue);

// Event delegation for close buttons
issuesContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-btn')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        closeIssue(index);
    }
});

// Initial render
renderIssues();