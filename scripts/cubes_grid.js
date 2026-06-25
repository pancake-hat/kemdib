import * as constants from './constants.js';

function formatCubeName(name) {
    const replacements = {
        'acube': 'additional cube',
        'fcube': 'familiar cube',
        'mirc': 'miracle',
        'sus': 'suspicious',
        'reg': 'regular',
        'equi': 'equality'
    };

    let formattedName = name.toLowerCase();
    Object.keys(replacements).forEach(key => {
        const regex = new RegExp(key, 'g');
        formattedName = formattedName.replace(regex, replacements[key]);
    });

    // Capitalize every word
    return formattedName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('cubes-grid');
    if (!grid) return;

    constants.allCubes.forEach(path => {
        const card = document.createElement('div');
        card.className = 'cube-card';

        const img = document.createElement('img');
        img.src = path;
        img.alt = 'Cube';

        const fileName = path.split('/').pop().split('.')[0];
        let nameText = fileName.replace(/^[A-Z]\d+_/, '').replace(/_/g, ' ');
        nameText = formatCubeName(nameText);

        const name = document.createElement('div');
        name.className = 'cube-name';
        name.textContent = nameText;

        card.appendChild(img);
        card.appendChild(name);
        grid.appendChild(card);
    });
});
