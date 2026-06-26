/**
 * Represents a Cube item in the game.
 */
export class Cube {
    /**
     * @param {Object} options
     * @param {string} options.id - Unique identifier for the cube (e.g., prefix like 'A00').
     * @param {string} options.name - The display name of the cube.
     * @param {string} options.effect - The description of what the cube does.
     * @param {string} options.highestTier - The highest tier reachable (Epic, Unique, Legendary).
     * @param {string[]} options.regions - Array of regions where this cube is available.
     * @param {string} options.imagePath - Path to the cube's image.
     */
    constructor({ id, name, effect, highestTier, regions, imagePath }) {
        this.id = id;
        this.name = name;
        this.effect = effect;
        this.highestTier = highestTier;
        this.regions = regions;
        this.imagePath = imagePath;
    }

    /**
     * Checks if the cube is available in a specific region.
     * @param {string} region
     * @returns {boolean}
     */
    isAvailableIn(region) {
        return this.regions.includes(region);
    }
}
