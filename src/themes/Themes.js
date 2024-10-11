import { extendTheme } from "@chakra-ui/react";

// Define your custom color themes
const cinnamonRoll = {
    id: "cinnamonRoll",
    name: "CinnamonRoll",
    colors: {
        1: "#5A4B48",
        2: "#867C79",
        3: "#B2ACA9",
        4: "#CCC4AC",
        5: "#8E583C",
        6: "#271813",
    },
};

const frostelle = {
    id: "frostelle",
    name: "Frostelle",
    colors: {
        1: "#4B597A",
        2: "#778BA6",
        3: "#E8E7D5",
        4: "#C3C5D1",
        5: "#7B6D95",
        6: "#181D30",
    },
};

const matchaLatte = {
    id: "matchaLatte",
    name: "MatchaLatte",
    colors: {
        1: "#4A5E49",
        2: "#95A779",
        3: "#E8E7D5",
        4: "#ADBA9D",
        5: "#BD7C37",
        6: "#273018",
    },
};

// Function to create a theme with global styles for background gradient
const createThemeWithGradient = (colors) => {
    return extendTheme({
        colors,
        styles: {
            global: {
                body: {
                    bgGradient: `radial(${colors[6]}, ${colors[1]}, ${colors[2]}, ${colors[3]})`,
                    minH: "100vh", // Ensure the body takes full height
                },
            },
        },
    });
};

// Create theme with global styles applied
const defaultTheme = createThemeWithGradient(cinnamonRoll.colors); // Set default to matchaLatte colors
const cinnamonRollTheme = createThemeWithGradient(cinnamonRoll.colors);
const frostelleTheme = createThemeWithGradient(frostelle.colors);
const matchaLatteTheme = createThemeWithGradient(matchaLatte.colors);

// Export all themes
const Themes = {
    defaultTheme, // Now default is matchaLatte
    cinnamonRoll: cinnamonRollTheme,
    frostelle: frostelleTheme,
    matchaLatte: matchaLatteTheme,
};

export default Themes;