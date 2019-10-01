import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { APP_STATE } from '../../../Redux/actions';
import Chart from '../../../components/chart/chart';
import { COINS } from '../../../constants/constants';

const ChartsContainer = (props) => {
    const { data, currentCoin, lastTimestamp } = props;
    const targetRef = useRef(null);
    const [dimensions, setDimensions] = useState({});

    const handleResize = useCallback(() => {
        const { height, width } = targetRef.current.getBoundingClientRect();
        const dimensions = {
            height: Math.round(height),
            width: Math.round(width)
        };
        setDimensions(dimensions);
    }, [targetRef]);

    // add and remove resize listener
    useLayoutEffect(() => {
        handleResize();

        //add/remove resize listener
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [targetRef.current]);
    console.log(targetRef.current);

    return (
        <svg ref={targetRef} style={{ width: '100%', height: '300' }}>
            {Object.keys(data).length > 0 && data ? (
                <Chart
                    color={{
                        fill: COINS[currentCoin].fillColor,
                        stroke: COINS[currentCoin].strokeColor
                    }}
                    data={data}
                    timestamp={lastTimestamp}
                    height={dimensions.height}
                    width={dimensions.width}
                />
            ) : null}
        </svg>
    );
};

const mapStateToProps = (state) => ({
    data: state[APP_STATE].priceHistory,
    currentCoin: state[APP_STATE].currentCoin,
    lastTimestamp: state[APP_STATE].lastTimestamp
});

export default connect(
    mapStateToProps,
    null
)(ChartsContainer);
