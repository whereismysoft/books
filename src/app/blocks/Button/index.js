import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './styles.css';

export default class componentName extends Component {
    render() {
        return (
            <div className={classnames(styles['button'], this.props.disabled && styles['isDisabled'])} onClick={this.props.disabed ? null : this.props.onClick}>
                {this.props.description}
            </div>
        )
    }
}
