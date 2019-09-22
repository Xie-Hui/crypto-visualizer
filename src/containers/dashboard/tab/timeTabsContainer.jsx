import React, { useState } from 'react';
import { MyTabs } from '../../../components/tab';

const times = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];

const TimeTabsContainer = (props) => {
    const [index, setIndex] = useState(0);
    return (
        <MyTabs
            tabs={times.map((item) => ({ label: item }))}
            maxwidth={0.5}
            value={index}
            onChange={(e, i) => setIndex(i)}
        />
    );
};

export default TimeTabsContainer;
