import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { globalStyle } from '../../styles/theme';
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    ...globalStyle(theme)
}));

export default (props) => {
    const globalStyles = useStyles();
    return (
        <Fragment>
            <CssBaseline />
            <div className={globalStyles}>{props.children}</div>
        </Fragment>
    );
};
