import React, { Component } from 'react';

import styles from './styles.css';

export default class Layout extends Component {
    render() {
        return (
            <div className={styles['layout']}>
                <div className={styles['layout--header']}>header</div>
                <div className={styles['layout--content']}>{this.props.children}</div>
                <div className={styles['layout--footer']}>footer</div>
            </div>
        )
    }
}
