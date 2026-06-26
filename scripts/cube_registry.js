import { Cube } from './cube.js';

/**
 * Fetches the cube data from the JSON database and initializes Cube instances.
 */
async function loadRegistry() {
    try {
        console.log('Loading cube registry...');
        const response = await fetch('./scripts/cubes.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Successfully loaded ${data.length} cubes from JSON.`);
        return data.map(cubeData => new Cube(cubeData));
    } catch (error) {
        console.error('Failed to load cube registry:', error);
        return [];
    }
}

// Export the promise instead of the resolved value to avoid top-level await issues
export const cubeRegistryPromise = loadRegistry();
