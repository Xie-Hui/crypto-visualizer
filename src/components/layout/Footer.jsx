import React from 'react';
import { Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles(({ spacing }) => ({
    root: {
        bottom: spacing(4),
        position: 'absolute',
        width: '100%'
    },
    link: {
        textTransform: 'none',
        paddingLeft: spacing(0),
        paddingRight: spacing(0)
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.root}>
            <Typography
                variant='subtitle1'
                color='textSecondary'
                align='center'
                //className={classes.link}
            >
                {`Developed by `}
                <Link href='http://hui-xie.com'>Hui Xie</Link>
                {` ⋅ `}
                <FontAwesomeIcon icon={faGithub} style={{ marginRight: '6px' }} />
                <Link href='https://github.com/Xie-Hui/crypto-visualizer'>Github</Link>
            </Typography>
        </footer>
    );
};

export default Footer;
