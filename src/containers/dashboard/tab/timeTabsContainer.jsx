import React from 'react';
import { connect } from 'react-redux';

import { MyTabs } from '../../../components/tab';
import { DURATIONS } from '../../../constants/constants';
import { APP_STATE, setCurrentDuration } from '../../../Redux/actions';

const TimeTabsContainer = (props) => {
    const { currentDuration, setCurrentDuration } = props;
    return (
        <MyTabs
            tabs={DURATIONS.keys.map((key) => DURATIONS[key])}
            maxwidth={0.5}
            value={DURATIONS.keys.indexOf(currentDuration)}
            onChange={(e, i) => {
                setCurrentDuration(DURATIONS.keys[i]);
            }}
        />
    );
};

const mapStateToProps = (state) => ({
    currentDuration: state[APP_STATE].currentDuration
});

export default connect(
    mapStateToProps,
    { setCurrentDuration }
)(TimeTabsContainer);
