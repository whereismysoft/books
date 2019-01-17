import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './styles.css';

import Input from '../Input';
import Button from '../Button';

export default class AuthorsBlock extends Component {

    constructor(props) {
        super(props);

        this.onAuthorInputChange = this.onAuthorInputChange.bind(this)
    }

    componentDidUpdate(prevProps) {
        console.log('authors block', prevProps.authors, this.props.authors)
    }

    onAuthorInputChange(e, index) {
        const values = e.target.value.split(' ');
        const {maxNameLen, maxSurnameLen} = this.props;
        
        if (values[0].length > maxNameLen || values[1] && values[1].length > maxSurnameLen) {
            return
        }

        this.props.onInputChange(e, index)

    }

    render() {
        // console.log('authors', this.props.authors);
        return (
            <div className={styles['authors']}>
                <div className={styles['authors--label']}>Введите авторов</div>
                <div className={styles['authors--elements']}>
                    {
                        Object.keys(this.props.authors).map( 
                            (item, index) => {
                                return <div className={styles['authors--row']}>
                                    <Input 
                                        value={this.props.authors[index]} 
                                        key={index + 'author'}
                                        onChange={(e) => this.onAuthorInputChange(e, index)}
                                        style={{marginBottom: '5px'}}
                                    />
                                    <div 
                                        onClick={() => this.props.deleteRow(index)} 
                                        className={classnames(styles['authors--delete'], !index && styles['invisible'])}
                                    >
                                        X
                                    </div>
                                </div>
                            })
                    }
                    <Button sm description={'Добавить автора'} onClick={this.props.addAuthor}/>
                </div>
            </div>
        )
    }
}
