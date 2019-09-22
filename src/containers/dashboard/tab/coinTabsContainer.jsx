import React, { useState } from 'react';
import { MyTabs } from '../../../components/tab';

const CoinTabsContainer = (props) => {
    const [index, setIndex] = useState(0);
    return (
        <MyTabs
            tabs={[
                { label: 'Bitcoin' },
                { label: 'Etherem' },
                { label: 'Litecoin' },
                { label: 'Ripple' }
            ]}
            value={index}
            onChange={(e, i) => setIndex(i)}
        />
    );
};

export default CoinTabsContainer;
