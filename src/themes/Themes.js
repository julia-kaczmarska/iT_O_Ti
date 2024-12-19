import { extendTheme } from '@chakra-ui/react';

export const cinnamonRoll = {
    id: 'cinnamonRoll',
    colors: {
        1: '#e1dfd9',
        2: '#5A4B48',
        3: '#8E583C',
        4: '#739881',
        5: '#271813',
    },
};

export const frostelle = {
    id: 'frostelle',
    colors: {
        1: '#dadbe3',
        2: '#4B597A',
        3: '#7B6D95',
        4: '#e5d8bb',
        5: '#181D30',
    },
};

export const matchaLatte = {
    id: 'matchaLatte',
    colors: {
        1: '#E8E7D5',
        2: '#4A5E49',
        3: '#95A779',
        4: '#d39a5f',
        5: '#273018',
    },
};

export const strawberryMilkshake = {
    id: 'strawberryMilkshake',
    colors: {
        1: '#efebe8',
        2: '#75333f',
        3: '#c08694',
        4: '#94cfef',
        5: '#311821',
    },
};

const createThemeWithGradient = (colors) => {
    return extendTheme({
        colors,
        styles: {
            global: {
                body: {
                    bgGradient: `radial(${colors[6]}, ${colors[1]}, ${colors[5]}, ${colors[4]})`,
                    minH: '100vh',
                },
            },
        },
    });
};

const Themes = {

    defaultTheme: createThemeWithGradient(cinnamonRoll.colors),
    cinnamonRoll: createThemeWithGradient(cinnamonRoll.colors),
    frostelle: createThemeWithGradient(frostelle.colors),
    matchaLatte: createThemeWithGradient(matchaLatte.colors),
    strawberryMilkshake: createThemeWithGradient(strawberryMilkshake.colors),
};

export default Themes;
