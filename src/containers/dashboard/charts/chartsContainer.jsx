import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { APP_STATE } from '../../../Redux/actions';
import Chart from '../../../components/chart/chart';
import { dataWithinDuration } from '../../../API/api';

const ChartsContainer = (props) => {
    const { data, currentCoin, currentDuration } = props;
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
            {Object.keys(data).length > 0 && data[currentCoin] ? (
                <Chart
                    color={'#666'}
                    duration={currentDuration}
                    data={dataWithinDuration(data[currentCoin], currentDuration)}
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
    currentDuration: state[APP_STATE].currentDuration
});

export default connect(
    mapStateToProps,
    null
)(ChartsContainer);
