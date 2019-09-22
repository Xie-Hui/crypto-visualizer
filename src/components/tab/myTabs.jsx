import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useTabsStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    indicator: {
        backgroundColor: theme.palette.primary.main
    }
}));

const useTabStyles = makeStyles(({ palette, breakpoints }) => ({
    root: {
        minHeight: 53,
        minWidth: 10,
        [breakpoints.up('md')]: {
            minWidth: 40
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
        textTransform: 'none',
        fontSize: 15,
        fontWeight: 700,
        color: palette.text.secondary
    }
}));

const MyTabs = ({ tabs, tabProps, ...props }) => {
    const tabsClasses = useTabsStyles(props);
    const tabClasses = useTabStyles(tabProps);
    return (
        <Fragment>
            <Tabs variant={'fullWidth'} {...props} classes={tabsClasses}>
                {tabs.map((tab) => (
                    <Tab
                        key={tab.label}
                        disableRipple
                        {...tab}
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
            label: PropTypes.node.isRequired
        })
    ),
    tabProps: PropTypes.shape({})
};
MyTabs.defaultProps = {
    tabs: [],
    tabProps: {}
};

export default MyTabs;