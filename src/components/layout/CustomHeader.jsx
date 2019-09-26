import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Typography from '@material-ui/core/Typography';
import { Header } from 'mui-layout';

const styles = ({ spacing, transitions, breakpoints, palette, shape }) => ({
    root: {
        //backgroundColor: palette.primary.main
    },
    header: {
        //fontWeight: 900,
        minWidth: 0,
        fontSize: 18
    },
    grow: {
        flexGrow: 1
    },
    search: {
        position: 'relative',
        marginRight: 0,
        borderRadius: shape.borderRadius,
        background: palette.grey[200],
        '&:hover': {
            background: palette.grey[300]
        },
        marginLeft: 0,
        width: '100%',
        [breakpoints.up('sm')]: {
            marginLeft: spacing(1),
            width: 'auto'
        }
    },
    searchIcon: {
        width: spacing(9),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        borderRadius: 4,
        paddingTop: spacing(1),
        paddingRight: spacing(1),
        paddingBottom: spacing(1),
        paddingLeft: spacing(10),
        transition: transitions.create('width'),
        width: '100%',
        [breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200
            }
        }
    }
});

const CustomHeader = ({ classes }) => (
    <Header
        renderMenuIcon={(opened) => (opened ? <LeftIcon /> : <MenuRoundedIcon />)}
        className={classes.root}
    >
        <Typography noWrap color={'text'} className={classes.header}>
            Crypto-Visualizer
        </Typography>
        <div className={classes.grow} />
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder='Search'
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
            />
        </div>
    </Header>
);

CustomHeader.propTypes = {
    screen: PropTypes.string,
    classes: PropTypes.shape({}).isRequired
};
CustomHeader.defaultProps = {
    screen: null
};

export default withStyles(styles)(CustomHeader);
