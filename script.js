// Function for explore tools button
function exploreTools() {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function for view prompts button
function viewPrompts() {
    alert("Navigating to AI Prompts catalog...");
}

// Interactive listener for navigation CTA button
document.addEventListener('DOMContentLoaded', () => {
    const ctaBtn = document.getElementById('cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            alert("Welcome to AI Growth Hub! Stay tuned for global updates.");
        });
    }
});
