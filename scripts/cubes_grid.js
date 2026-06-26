import { cubeRegistryPromise } from './cube_registry.js';

/**
 * Manages the rendering of the cubes grid and the tooltip display using the Manager pattern (Event Delegation).
 */
document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('cubes-grid');
    if (!grid) return;

    // Wait for the registry to be loaded from the JSON file
    const cubeRegistry = await cubeRegistryPromise;

    // Create a Map for O(1) lookup by ID
    const cubeMap = new Map(cubeRegistry.map(cube => [cube.id, cube]));

    // Create Tooltip Element
    const tooltip = document.createElement('div');
    tooltip.className = 'cube-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-name" id="tooltip-name"></div>
        <div class="tooltip-effect" id="tooltip-effect"></div>
        <div class="tooltip-info">
            Highest Tier: <span id="tooltip-tier"></span><br>
            Available in: <span id="tooltip-regions"></span>
        </div>
    `;
    document.body.appendChild(tooltip);

    // Track the current card being hovered to emulate mouseenter/mouseleave logic
    let currentCard = null;

    /**
     * Renders the grid using the cube registry
     */
    function renderGrid() {
        if (!cubeRegistry || cubeRegistry.length === 0) {
            grid.innerHTML = '<div style="color: white; padding: 20px;">Failed to load cubes. Please check the console for errors.</div>';
            return;
        }

        grid.innerHTML = '';
        cubeRegistry.forEach((cube) => {
            const card = document.createElement('div');
            card.className = 'cube-card';
            card.dataset.cubeId = cube.id;

            const img = document.createElement('img');
            img.src = cube.imagePath;
            img.alt = cube.name;

            const name = document.createElement('div');
            name.className = 'cube-name';
            name.textContent = cube.name;

            card.appendChild(img);
            card.appendChild(name);
            grid.appendChild(card);
        });
    }

    /**
     * Tooltip Manager (Event Delegation)
     */

    // Handle "mouseenter" via delegation
    grid.addEventListener('mouseover', (e) => {
        const card = e.target.closest('.cube-card');
        if (card && card !== currentCard) {
            currentCard = card;
            const cubeId = card.dataset.cubeId;
            const cube = cubeMap.get(cubeId);
            if (cube) {
                showTooltip(e, cube);
            }
        }
    });

    // Handle tooltip movement
    grid.addEventListener('mousemove', (e) => {
        if (tooltip.style.display === 'block') {
            moveTooltip(e);
        }
    });

    // Handle "mouseleave" via delegation
    grid.addEventListener('mouseout', (e) => {
        if (currentCard) {
            // Only hide if moving outside the current card boundary
            if (!e.relatedTarget || !currentCard.contains(e.relatedTarget)) {
                hideTooltip();
                currentCard = null;
            }
        }
    });

    // Persistent view support for clicks (and mobile compatibility)
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.cube-card');
        if (card) {
            e.stopPropagation();
            const cubeId = card.dataset.cubeId;
            const cube = cubeMap.get(cubeId);
            if (cube) {
                showTooltip(e, cube);
            }
        }
    });

    /**
     * Displays and populates the tooltip
     */
    function showTooltip(e, cube) {
        const nameEl = document.getElementById('tooltip-name');
        const effectEl = document.getElementById('tooltip-effect');
        const tierEl = document.getElementById('tooltip-tier');
        const regionsEl = document.getElementById('tooltip-regions');

        nameEl.textContent = cube.name;

        // Construct the dynamic effect text
        const baseEffect = `Resets the potential of equipment, up to ${cube.highestTier}.`;

        // Use the base effect and append cube-specific effect if available
        if (cube.effect && cube.effect.trim() !== "") {
            effectEl.innerHTML = `${baseEffect} ${cube.effect}`;
        } else {
            effectEl.textContent = baseEffect;
        }

        tierEl.textContent = cube.highestTier;

        // Apply tier color
        tierEl.className = `tier-${cube.highestTier.toLowerCase()}`;

        regionsEl.textContent = cube.regions.join(', ').toUpperCase();

        tooltip.style.display = 'block';
        moveTooltip(e);
    }

    /**
     * Positions the tooltip near the cursor
     */
    function moveTooltip(e) {
        const padding = 15;
        let x = e.clientX + padding;
        let y = e.clientY + padding;

        const tooltipRect = tooltip.getBoundingClientRect();

        if (x + tooltipRect.width > window.innerWidth) {
            x = e.clientX - tooltipRect.width - padding;
        }
        if (y + tooltipRect.height > window.innerHeight) {
            y = e.clientY - tooltipRect.height - padding;
        }

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    }

    /**
     * Hides the tooltip
     */
    function hideTooltip() {
        tooltip.style.display = 'none';
    }

    // Close tooltip when clicking elsewhere on the page
    document.addEventListener('click', () => {
        hideTooltip();
        currentCard = null;
    });

    renderGrid();
});
