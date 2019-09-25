import React, { useLayoutEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { APP_STATE } from '../../../Redux/actions';
import Chart from '../../../components/chart/chart';

const ChartsContainer = (props) => {
    const { data } = props;
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({});

    // add and remove resize listener
    useLayoutEffect(() => {
        const { height, width } = targetRef.current.getBoundingClientRect();
        const dimensions = {
            height: Math.round(height),
            width: Math.round(width)
        };
        setDimensions(dimensions);
        console.log(dimensions);
    }, [targetRef.current]);
    return (
        <svg ref={targetRef} style={{ width: '100%' }}>
            {Object.keys(data).length > 0 ? (
                <Chart
                    color={'#666'}
                    data={data['BTC']}
                    height={dimensions.height}
                    width={dimensions.width}
                />
            ) : null}
        </svg>
    );
};

const mapStateToProps = (state) => ({
    data: state[APP_STATE].priceHistory
});

export default connect(
    mapStateToProps,
    null
)(ChartsContainer);
