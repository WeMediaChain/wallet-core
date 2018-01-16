import React, { Component } from 'react';
import PropTypes from 'proptypes';
import './style';

export default function PreviewHeader(props) {
    const { cions } = props;
    return (
        <header className="preview-header-container">
            <p className="text">目前总共获取</p>
            <p className="number">{cions}</p>
            <p className="text">币</p>
        </header>
    );
}

PreviewHeader.propTypes = {
    cions: PropTypes.number.isRequired,
};

PreviewHeader.defaultProps = {
    cions: 0,
};
