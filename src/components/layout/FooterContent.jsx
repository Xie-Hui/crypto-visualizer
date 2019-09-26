import React from 'react';
import Typography from '@material-ui/core/Typography';

const FooterContent = () => (
    <div style={{ maxWidth: 700, margin: 'auto', textAlign: 'center' }}>
        <Typography variant='caption' align={'center'}>
            {`Design & Developed by Hui Xie © Copyright ${new Date().getFullYear()}`}
        </Typography>
    </div>
);

FooterContent.propTypes = {};
FooterContent.defaultProps = {};

export default FooterContent;
