import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Layout from './components/Layout';
import MainPage from './components/MainPage';
// import BookPage from './components/BookPage';
import BookCreator from './components/BookCreator';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route exact path="/book/:id" component={BookCreator}/>
                        <Route exact path="/new" component={BookCreator}/>
                        <Redirect from='*' to='/'/>
                    </Switch>
                </Layout>
            </BrowserRouter> 
        )
    }
}
