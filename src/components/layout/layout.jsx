import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';

//css normalizer
import 'normalize.css';

const useStyles = makeStyles((theme) => ({
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
            color: theme.color.text,
            fontFamily: ['Roboto Mono', 'monospace'],
            fontWeight: 400,
            fontSize: 14,
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
}));

export default (props) => {
    const globalStyles = useStyles();
    return (
        <Fragment>
            <div className={globalStyles}>{props.children}</div>
        </Fragment>
    );
};
