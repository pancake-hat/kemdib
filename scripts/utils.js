export function blink(element) {
    element.animate({ opacity: 0 }, 200, 'linear', function() {
        $(this).animate({ opacity: 1 }, 200);
    });
}

export function getCubeIdFromPath(path) {
    if (!path) return null;
    const filename = path.split('/').pop();
    return filename.substring(0, 3);
}

export function getCubeImageFromId(cubeId) {
    const cubeImages = {
        'A00': 'images/cubes/A00_sus_cube.png',
        'A01': 'images/cubes/A01_yellow_cube.png',
        'A02': 'images/cubes/A02_purple_cube.png',
        'A03': 'images/cubes/A03_red_cube.png',
        'A04': 'images/cubes/A04_black_cube.png',
        'A05': 'images/cubes/A05_sus_acube.png',
        'A06': 'images/cubes/A06_green_acube.png',
        'A07': 'images/cubes/A07_white_acube.png',
        'A10': 'images/cubes/A10_reg_cube.png',
        'A11': 'images/cubes/A11_choice_cube.png',
        'A12': 'images/cubes/A12_reg_acube.png',
        'A13': 'images/cubes/A13_choice_acube.png',
        'B00': 'images/cubes/B00_balrog_cube.png',
        'B01': 'images/cubes/B01_zakum_cube.png',
        'B02': 'images/cubes/B02_horntail_cube.png',
        'B03': 'images/cubes/B03_pinkbean_cube.png',
        'B04': 'images/cubes/B04_cygnus_cube.png',
        'C00': 'images/cubes/C00_root_cube.png',
        'C01': 'images/cubes/C01_deep_root_cube.png',
        'C02': 'images/cubes/C02_beyond_cube.png',
        'C03': 'images/cubes/C03_excellence_cube.png',
        'C04': 'images/cubes/C04_beyond_acube.png',
        'C05': 'images/cubes/C05_excellence_acube.png',
        'C06': 'images/cubes/C06_alien_ncube.png',
        'C07': 'images/cubes/C07_strange_fcube.png',
        'C08': 'images/cubes/C08_maple_leaf_cube.png',
        'C09': 'images/cubes/C09_fantasy_cube.png',
        'G10': 'images/cubes/G10_mystical_cube.png',
        'G11': 'images/cubes/G11_hard_cube.png',
        'G12': 'images/cubes/G12_solid_cube.png',
        'G13': 'images/cubes/G13_glowing_cube.png',
        'G14': 'images/cubes/G14_bright_cube.png',
        'G15': 'images/cubes/G15_mystical_acube.png',
        'G16': 'images/cubes/G16_glowing_acube.png',
        'G17': 'images/cubes/G17_bright_acube.png',
        'J00': 'images/cubes/J00_memorial_cube.png',
        'J01': 'images/cubes/J01_master_mirc_acube.png',
        'J10': 'images/cubes/J10_neo_cube.png',
        'J11': 'images/cubes/J11_mega_cube.png',
        'J12': 'images/cubes/J12_neo_acube.png',
        'J13': 'images/cubes/J13_mega_acube.png',
        'O00': 'images/cubes/O00_mirc_cube.png',
        'O01': 'images/cubes/O01_premium_mirc_cube.png',
        'O02': 'images/cubes/O02_golden_mirc_cube.png',
        'O03': 'images/cubes/O03_revolutionary_mirc_cube.png',
        'O04': 'images/cubes/O04_enlightening_mirc_cube.png',
        'O05': 'images/cubes/O05_reflection_cube.png',
        'O06': 'images/cubes/O06_selection_mirc_cube.png',
        'O07': 'images/cubes/O07_platinum_cube.png',
        'S00': 'images/cubes/S00_hexa_cube.png',
        'S01': 'images/cubes/S01_equi_cube.png',
        'S02': 'images/cubes/S02_uni_cube.png',
        'S03': 'images/cubes/S03_absolute_acube.png',
        'S04': 'images/cubes/S04_field_acube.png',
        'S05': 'images/cubes/S05_hexa_cube.png',
        'S06': 'images/cubes/S06_equi_cube.png',
        'S07': 'images/cubes/S07_uni_cube.png',
        'S08': 'images/cubes/S08_equi_acube.png',
        'S09': 'images/cubes/S09_new_year_mirc_cube.png',
        'S10': 'images/cubes/S10_new_year_master_mirc_cube.png',
        'T00': 'images/cubes/T00_mysterious_cube.png',
        'T01': 'images/cubes/T01_restoration_cube.png',
        'T02': 'images/cubes/T02_precious_acube.png',
        'T03': 'images/cubes/T03_restoration_acube.png',
    };
    return cubeImages[cubeId] || 'images/cubes/O00_mirc_cube.png'; // Fallback
}
