import { extendTheme } from '@chakra-ui/react';

const cinnamonRoll = {
    id: 'cinnamonRoll',
    colors: {
        1: '#5A4B48',
        2: '#867C79',
        3: '#B2ACA9',
        4: '#CCC4AC',
        5: '#8E583C',
        6: '#271813',
    },
};

const frostelle = {
    id: 'frostelle',
    colors: {
        1: '#4B597A',
        2: '#778BA6',
        3: '#E8E7D5',
        4: '#C3C5D1',
        5: '#7B6D95',
        6: '#181D30',
    },
};

const matchaLatte = {
    id: 'matchaLatte',
    colors: {
        1: '#4A5E49',
        2: '#95A779',
        3: '#E8E7D5',
        4: '#ADBA9D',
        5: '#BD7C37',
        6: '#273018',
    },
};

const strawberryMilkshake = {
    id: 'strawberryMilkshake',
    colors: {
        1: '#75333f',
        2: '#c08694',
        3: '#efebe8',
        4: '#f1e6c5',
        5: '#a65a5a',
        6: '#311821',
    },
};

export const other = {

    colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        brown: '#867C79',
        pink: '#c08694',
        green: '#95A779',
        blue: '#778BA6'
    },
}

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
