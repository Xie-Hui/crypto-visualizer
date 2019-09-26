import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const NavContent = ({ setCurrentCoin, currentCoin, coinList }) => (
    <List>
        {coinList.keys.map((coinKey) => {
            const { name, key, icon } = coinList[coinKey];
            console.log({ coinKey, currentCoin });
            return (
                <ListItem
                    key={key}
                    selected={coinKey === currentCoin}
                    button
                    onClick={() => setCurrentCoin(coinKey)}
                >
                    <ListItemIcon>{icon()}></ListItemIcon>
                    <ListItemText primary={name} primaryTypographyProps={{ noWrap: true }} />
                </ListItem>
            );
        })}
    </List>
);

export default NavContent;
