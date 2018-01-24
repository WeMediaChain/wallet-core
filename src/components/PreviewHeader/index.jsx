import React from 'react';
import PropTypes from 'proptypes';
import './style';

export default function PreviewHeader(props) {
    const { cions } = props;
    return (
        <header className="preview-header-container">
            <p className="text">目前总共获取</p>
            <p className="number">{cions || '21324.4352343231224312'}</p>
            <p className="text">WMC</p>
        </header>
    );
}

PreviewHeader.propTypes = {
    cions: PropTypes.number.isRequired,
};

PreviewHeader.defaultProps = {
    cions: 0,
};
