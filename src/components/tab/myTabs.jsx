import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, Typography } from '@material-ui/core';

const useTabsStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    indicator: {
        backgroundColor: theme.palette.primary.main
    }
}));

const useTabStyles = makeStyles(({ palette, breakpoints, spacing }) => ({
    root: {
        minHeight: 53,
        minWidth: 30,
        paddingLeft: spacing(1.5),
        paddingRight: spacing(1.5),
        [breakpoints.up('md')]: {
            minWidth: 20
        },
        '&:hover': {
            backgroundColor: 'rgba(29, 161, 242, 0.1)',
            '& .MuiTab-label': {
                color: '#1da1f2'
            }
        },
        '&$selected': {
            '& *': {
                color: palette.primary.main
            }
        }
    },
    selected: {},
    textColorInherit: {
        opacity: 1
    },
    wrapper: {
        textTransform: 'none'
    }
}));

const MyTabs = ({ tabs, tabProps, ...props }) => {
    const tabsClasses = useTabsStyles(props);
    const tabClasses = useTabStyles(tabProps);
    return (
        <Fragment>
            <Tabs {...props} classes={tabsClasses}>
                {tabs.map((tab) => (
                    <Tab
                        key={tab.name}
                        disableRipple
                        label={
                            <Typography color='textSecondary' variant='body1' noWrap>
                                {tab.name}
                            </Typography>
                        }
                        classes={{
                            ...tabClasses,
                            wrapper: `${tabClasses.wrapper} MuiTab-label`
                        }}
                    />
                ))}
            </Tabs>
        </Fragment>
    );
};

MyTabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.node.isRequired
        })
    ),
    tabProps: PropTypes.shape({})
};
MyTabs.defaultProps = {
    tabs: [],
    tabProps: {}
};

export default MyTabs;
