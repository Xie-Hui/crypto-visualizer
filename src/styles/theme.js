import { createMuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// global style
const useGlobalStyle = makeStyles((theme) => ({
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
            '-moz-osx-font-smoothing': 'grayscale',
            '-webkit-font-smoothing': 'antialiased'
        },

        '#root': {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            flex: [1, 1, '100%']
        },
        a: {
            textDecoration: 'none',
            color: theme.color.text
        }
    }
}));

/* -----------------------
 * THEME
 * --------------------- */
const appTheme = createMuiTheme({
    palette: {
        primary: { main: '#3f51b5' },
        text: {
            primary: 'rgba(32, 41, 91, 0.87)',
            secondary: 'rgba(32, 41, 91, 0.54)',
            disabled: 'rgba(32, 41, 91, 0.38)',
            hint: 'rgba(32, 41, 91, 0.38)'
        }
    },
    color: {
        bg: '#eee',
        text: '#333',
        midGrey: '#dae1e9'
    }
});

export { useGlobalStyle, appTheme };
