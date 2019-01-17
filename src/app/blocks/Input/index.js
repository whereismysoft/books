import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './styles.css';

export default class Input extends Component {

    render() {
        return (
            <div className={styles['block']} style={this.props.style}>
                <div className={classnames(styles['block--label'], !this.props.label && styles['isEmpty'])}>
                    {this.props.label}
                </div>
                <div className={styles['block--input']}>
                    <input
                        type={this.props.type} 
                        value={this.props.value} 
                        onChange={this.props.onChange}
                        min={this.props.min || null}
                        max={this.props.max || null}
                    />
                </div>
                <div className={classnames(styles['block--info'], !this.props.info && styles['isEmpty'])}>
                    {this.props.info}
                </div>
            </div>
        )
    }
}
