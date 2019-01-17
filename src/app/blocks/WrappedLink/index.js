import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classnames from 'classnames';

import styles from './styles.css';

class WrappedLinks extends Component {

    changeLocation() {
        const {history, to} = this.props;
        history.push(to);
    }

    render() {
        return (
            <div className={classnames(styles['link'], this.props.additionalStyles)} onClick={this.changeLocation.bind(this)}>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(WrappedLinks)
