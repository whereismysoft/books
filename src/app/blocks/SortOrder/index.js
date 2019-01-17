import React, { Component } from 'react';

import styles from './styles.css';

export default class SortOrder extends Component {

    render() {
        return (
            <div className={styles['sort']}>
            <div className={styles['sort--label']}>Сортировать по</div>
            <select onChange={this.props.onChange}>
                {
                    this.props.options.map((item, index) => {
                        return <option 
                            value={item.type} 
                            key={item.type+''+index}
                            selected={this.props.selected === item.type}
                        >
                            {item.name}
                        </option>
                    })
                }
            </select>
            </div>
        )
    }
}
