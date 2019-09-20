import React from 'react';
import { Layout } from './components/layout';
import { DashboardContainer, ToolbarContainer, ChartsContainer } from './containers';
import { ThemeProvider } from '@material-ui/styles';

/* -----------------------
 * THEME
 * --------------------- */
const PIXEL_SCALE = 4;
const scale = PIXEL_SCALE / 16;

const breakpoint = {
    up: {
        xl: 1440,
        lg: 1024,
        md: 768,
        sm: 576
    },
    down: {
        lg: 1439,
        md: 1023,
        sm: 767,
        xs: 575
    }
};

const color = {
    bg: '#000',
    text: '#fff'
};

const font = {
    primary: `'Roboto Mono', monospace`
};

const fontWeight = {
    black: '900',
    bold: '700',
    semibold: '600',
    medium: '500',
    regular: '400',
    light: '300',
    extralight: '200'
};

const spacing = {
    xsmall: scale,
    small: scale * 2,
    medium: scale * 4,
    large: scale * 8,
    xlarge: scale * 16
};

const theme = {
    breakpoint,
    color,
    font,
    fontWeight,
    scale,
    spacing
};

const App = () => (
    <ThemeProvider theme={theme}>
        <Layout>
            <DashboardContainer>
                <ToolbarContainer />
                <ChartsContainer />
            </DashboardContainer>
        </Layout>
    </ThemeProvider>
);

export default App;
