// Function for explore tools button
function exploreTools() {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to navigate to Prompts Page
function viewPrompts() {
    window.location.href = 'prompts.html';
}

// Interactive listener for navigation CTA button
document.addEventListener('DOMContentLoaded', () => {
    const ctaBtn = document.getElementById('cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            window.location.href = 'prompts.html';
        });
    }
});
