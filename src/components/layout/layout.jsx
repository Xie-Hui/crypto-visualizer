import React, { Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';

export default (props) => (
    <Fragment>
        <CssBaseline />
        <div className='layout'>{props.children}</div>
    </Fragment>
);
