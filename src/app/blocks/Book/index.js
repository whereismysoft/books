import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.css';

export default class Book extends Component {

    constructor(props) {
        super(props);

        this.generateAuthors = this.generateAuthors.bind(this);
    }

    generateAuthors() {
        const authors = this.props.book.authors;
        let keys = Object.keys(authors);

        let arr = [];

        keys.map(
            (item, index) => {
                arr.push(authors[item])
            }
        )

        return arr.join(', ');
    }

    render() {
        return (
            <div className={styles['book']}>
                <Link className={styles['book--linkBlock']} to={'/book/' + this.props.id}>
                        <img className={styles['book--img']} src={this.props.book.img}/>
                        <div className={styles['book--title']}>{this.props.book.title}</div>
                        <div className={styles['book--authors']}>{this.generateAuthors()}</div>
                </Link>
                <div 
                    className={styles['book--remove']} 
                    onClick={() => this.props.onDelete(this.props.id)}
                >
                    X
                </div>
            </div>
        )
    }
}
