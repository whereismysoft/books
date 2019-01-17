import React, { Component } from 'react';

import styles from './styles.css';

import Book from '../../blocks/Book';
import WrappedLink from '../../blocks/WrappedLink';
import SortOrder from '../../blocks/SortOrder';

export default class MainPage extends Component {

    componentDidMount() {
        console.log('sort order is by', this.props.SortOrder)
    }

    onSortOrderChange(e) {
        this.props.setSortOrder(e.target.value)
        // console.log('sort change', e.target.value)
    }

    sortElements(a, b) {
        console.log('sort', a, b)
        const books = this.props.books
        const sortType = this.props.sortOrder
        
        if (books[a][sortType] > books[b][sortType]) {
            return -1;
          }
          if (a < b) {
            return 1;
          }
          // a must be equal to b
          return 0;
    }

    render() {
        return (
            <div className={styles['main']}>
                <div className={styles['main--bar']}>
                    <WrappedLink additionalStyles={styles['main--addButton']} to={'/new'}>
                        Добавить книгу
                    </WrappedLink>
                    <SortOrder 
                        selected={this.props.sortOrder}
                        options={[
                                {type: 'title', name: 'заголовку'},
                                {type: 'publishYear', name: 'году публикации'}
                            ]} 
                        onChange={this.onSortOrderChange.bind(this)}
                        additionalStyles={styles['main--sort']}
                    />
                </div>
                <div className={styles['main--books']}>
                    {   
                        Object.keys(this.props.books).length ?
                            Object.keys(this.props.books).sort(this.sortElements.bind(this)).map(
                                (item, index) => {
                                    return <Book 
                                        id={item}
                                        key={index + '_' + item}
                                        book={this.props.books[item]}
                                        onDelete={this.props.handleBookDelete.bind(this)}
                                    />
                                }
                            )
                            :
                            <div className={styles['main--empty']}>Книги отсутствуют</div>
                    }
                </div>
            </div>
        )
    }
}
