import { createMuiTheme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

// global style

const globalStyle = (theme) => ({
    '@global': {
        html: {
            boxSizing: 'border-box'
        },

        '*, *:before, *:after': {
            boxSizing: 'inherit'
        },

        'html, body': {
            minHeight: '100vh'
        },

        body: {
            display: 'flex',
            margin: 0,
            padding: 0,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.color.bg,
            '-moz-osx-font-smoothing': 'grayscale',
            '-webkit-font-smoothing': 'antialiased'
        },

        '#root': {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            flex: [1, 1, '100%']
        }
    }
});

/* -----------------------
 * THEME
 * --------------------- */
const appTheme = createMuiTheme({
    palette: {
        primary: blue
    },
    color: {
        bg: '#eee',
        text: '#333',
        midGrey: '#dae1e9'
    }
});

export { globalStyle, appTheme };
