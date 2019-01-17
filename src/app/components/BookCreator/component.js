import React, { Component } from 'react';

import styles from './styles.css';

import Input from '../../blocks/Input';
import AuthorsBlock from '../../blocks/AuthorsBlock';
import Button from '../../blocks/Button';
import WrappedLink from '../../blocks/WrappedLink';

import { validateNumInDiapason, validateISBN, validateImgUrl } from '../../../utils/validation';
import { formatDate } from '../../../utils/formatDate';

// redux actions will check for string parameters

export default class BookCreator extends Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            parameters: {
                title: '',
                authors: {
                    0: ''
                },
                pageCount: 1,
                publisher: '',
                publishYear: '',
                publishDate: '',
                isbn: '',
                img: '',
            },
            isButtonDisabled: true,
            saveButtonText: 'Сохранить книгу',
            saveButtonFunction: this.props.addBook,
            id: undefined
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.detectDisabledButton = this.detectDisabledButton.bind(this);
        this.checkIsCorrectAuthorsField = this.checkIsCorrectAuthorsField.bind(this);
        this.timeoutId = null;
    }

    componentDidMount() {
        console.log('upd prps', this.props)
        if (/book/ig.test(this.props.match.path)) {
            this.setState({
                parameters: {
                    ...this.props.books[this.props.match.params.id]
                },
                saveButtonText: 'Сохранить изменения',
                saveButtonFunction: this.props.updateCurrentBook,
                id: this.props.match.params.id
            })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.parameters.authors != prevState.parameters.authors && this.state.parameters.title) { 
            this.detectDisabledButton() 
        }
    }

    addAuthor() {
        const obj = this.state.parameters.authors;
        let keys = Object.keys(obj);

        this.setState({
            parameters: {
                ...this.state.parameters,
                authors: {
                    ...this.state.parameters.authors,
                    [keys.length]: '' 
                }
            }
        })
    }

    removeAuthor(key) {
        let obj = this.state.parameters.authors;
        
        delete obj[key];

        this.setState({
            parameters: {
                ...this.state.parameters,
                authors: obj
            }
        })
    }

    onAuthorsInputChange(e, index, max) {
        let obj = this.state.parameters.authors;

        this.setState({
            parameters: {
                ...this.state.parameters,
                authors: {
                    ...this.state.parameters.authors,
                    [index]: e.target.value
                }
            }
        })
    }

    handleInputChange(e, name, maxLen) {
        const value = e.target.value;
        if (value.length > maxLen) { return }

        this.setState({
            parameters: {
                ...this.state.parameters,
                [name]: value
            }
        })
    }

    handleInputChangeWithValidation(e, name) {
        const value = e.target.value;

        clearTimeout(this.timeoutId)

        this.setState({
            parameters: {
                ...this.state.parameters,
                [name]: value
            }
        })

        this.timeoutId = setTimeout(
            () => this.validateString(value, name), 550
        );
    }

    validateString(value, type) {
        let fn;

        switch(type) {
            case 'pageCount':
                fn = this.validatePageCountString.bind(this);
                break;
            case 'publishYear':
                fn = this.validatePublishYearString.bind(this);
                break;
            case 'publishDate':
                fn = this.validatePublishDateString.bind(this);
                break;
            case 'isbn':
                fn = this.handleISBNValidation.bind(this);
                break;
            case 'img':
                fn = this.handlelImgValidation.bind(this);
                break;
        }

        fn(value);
    }

    validatePageCountString(value) {

        validateNumInDiapason(value, 1, 10000)
            .then(res => console.log('validation ok', res))
            .catch(
                err => this.setState({
                    parameters: {
                        ...this.state.parameters,
                        'pageCount': err
                    }
                })
            )  
    }

    validatePublishYearString(value) {
        if (value == '') { return }
        
        validateNumInDiapason(value, 1800, new Date().getFullYear())
            .then(res => console.log('validation ok', res))
            .catch(
                err => this.setState({
                    parameters: {
                        ...this.state.parameters,
                        'publishYear': err
                    }
                })
            )
    }

    validatePublishDateString(value) {
        const dateToMs = (date) => new Date(date).getTime();

        if (value == '') { return }

        validateNumInDiapason( dateToMs(value), dateToMs('1800-01-01'), dateToMs(new Date()) )
            .then(res => console.log('validation ok', res))
            .catch(
                err => this.setState({ 
                    parameters: {
                        ...this.state.parameters,
                        publishDate: formatDate(new Date(err))
                    }
                })
            )
    }

    handleISBNValidation(value) {
        validateISBN(value)
            .then( 
                res => this.setState({
                    parameters: {
                        ...this.state.parameters,
                        isbn: res
                    }
                })
            )
    }

    handlelImgValidation(value) {
        validateImgUrl(value)
            .then(
                res => this.setState({
                    parameters: {
                        ...this.state.parameters,
                        img: res
                    }
                })
            )
    }

    detectDisabledButton() {
        let isDisabled;

        if (this.state.parameters.title.length && this.checkIsCorrectAuthorsField()) {
            isDisabled = false;
        } else {
            isDisabled = true;
        }

        this.setState({
            isButtonDisabled: isDisabled
        })
    }

    checkIsCorrectAuthorsField() {
        var isCorrect = true
        for (var i = 0; i < Object.keys(this.state.parameters.authors).length; i++ ) {
            if (!/[^\s]{1,30}\s[^\s]{1,30}/.test(this.state.parameters.authors[i])) {
                isCorrect = false;
            }
        }

        return isCorrect
    }

    saveChanges() {
        new Promise (
            (resolve, reject) => {
                resolve(this.state.saveButtonFunction(this.state.parameters, this.state.id))
            }
        )
        .then( res => this.props.history.push('/') )
    }

    render() {
        return (
            <div className={styles['creatorBlock']}>
                <WrappedLink additionalStyles={styles['creatorBlock--link']} to={'/'}>
                    Вернуться на главную
                </WrappedLink>
                <div className={styles['creatorBlock--inputs']}>
                    <div className={styles['creatorBlock--element']}>
                        <Input 
                            label={'Заголовок'} 
                            value={this.state.parameters.title} 
                            onChange={(e) => this.handleInputChange(e, 'title', 30)}
                        />
                    </div>
                    <div className={styles['creatorBlock--element']}>
                        <AuthorsBlock   
                            authors={this.state.parameters.authors}
                            addAuthor={this.addAuthor.bind(this)}
                            onInputChange={this.onAuthorsInputChange.bind(this)}
                            maxNameLen={30}
                            maxSurnameLen={30}
                            deleteRow={this.removeAuthor.bind(this)}
                        />
                    </div>
                    <div className={styles['creatorBlock--element']}>
                        <Input 
                            label={'Количество страниц'}
                            type={'number'}
                            value={this.state.parameters.pageCount}
                            onChange={(e) => this.handleInputChangeWithValidation(e, 'pageCount', 1, 10000)}
                        />
                    </div>
                    <div className={styles['creatorBlock--element']}>
                        <Input 
                            label={'Название издательства'}
                            value={this.state.parameters.publisher}
                            onChange={(e) => this.handleInputChange(e, 'publisher', 30)}
                        />
                    </div>
                    <div className={styles['creatorBlock--element']}>
                        <Input
                            label={'Год публикации'}
                            type={'number'}
                            value={this.state.parameters.publishYear}
                            min={1800}
                            max={new Date().getFullYear()}
                            onChange={(e) => this.handleInputChangeWithValidation(e, 'publishYear')}
                        />
                    </div>
                    <div className={styles['creatorBlock--element']}>
                        <Input 
                            label={'Дата выхода в тираж'}
                            type={'date'}
                            value={this.state.parameters.publishDate}
                            min={'1800-01-01'}
                            max={formatDate(new Date())}
                            // max={'2019-01-10'}
                            onChange={(e) => this.handleInputChangeWithValidation(e, 'publishDate')}
                        />
                    </div>
                    <div className={styles['creatorBlock--element']}>
                        <Input 
                            label={'ISBN'}
                            type={'isbn'}
                            value={this.state.parameters.isbn}
                            onChange={(e) => this.handleInputChangeWithValidation(e, 'isbn')}
                        />
                    </div>
                    <div className={styles['creatorBlock--element']}>
                        <Input
                            label={'Изображение'}
                            type={'img'}
                            value={this.state.parameters.img}
                            onChange={(e) => this.handleInputChangeWithValidation(e, 'img')}
                            info={'введите URL изображения'}
                        />
                    </div>
                </div>
                <Button 
                    description={this.state.saveButtonText} 
                    disabled={this.state.isButtonDisabled} 
                    onClick={this.saveChanges.bind(this)}
                />
            </div>
        )
    }
}

// book: {
    // title: @maxlength 30symblos,
    // authors: [
    //     {
    //         name: @maxlength 20 symbols,
    //         surname: @maxlength 20 symbols,
    //     }
    // ],
    // totalPages: int,
    // publishedBy: @maxlength 30symblos,
    // yearOfPublishing: 0001,
    // releaseDate: 01.01.0001,
    // ISBN: str,
    // picture: pic
// }