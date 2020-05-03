// Let's import modules from react and other components
import { NavLink, BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';
import Photo from './Photo';
import apiKey from './config';

// Creating App and creating constructors
export default class App extends Component {
  constructor() {
    super();
    //Creating arrays for photos
    this.state = {
      photos: [],
      Puppies:[],
      Kittens: [],
      Stars: [],
      tag: [],
      loading: true,
    };
  }

  componentDidMount() {
    //When components are mounter, app will perform search
    this.SearchPhotos();
    this.SearchPhotos('Puppies');
    this.SearchPhotos('Kittens');
    this.SearchPhotos('Stars');
    
  }

  //Searching function using axios
  SearchPhotos = query => {
    this.setState({
      // Showing loading message to user
      loading: true
    });
    // Fethching data
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        // if query is one of the themes app will show pre-loaded images
        if ( query === 'Kittens' || query === 'Stars' || query === 'Puppies') {
          this.setState({
            [query]: response.data.photos.photo,
            loading: false
          });
        } else if (query !== undefined) {
          // If we are searching for some thing, else we will get photos from API
          this.setState({
            photos: response.data.photos.photo,
            tag: query,
            loading: false
          });
        }
      })
      // Catching errors in console
      .catch(error => {
        console.log('Oh, no, an error have occured!');
      })
  }
  render() {
    // Renderingresults
    return (
      // BrowserRouter will fix problems which accures with GitHub pages
      <BrowserRouter>
        <div className="container">
        <div>
      <Form onSearch={this.SearchPhotos} />
      <nav className="main-nav">
      <ul>
      {/* Showing categories */}
        <li><NavLink to='/Puppies'>Puppies</NavLink></li>
        <li><NavLink to='/Kittens'>Kittens</NavLink></li>
        <li><NavLink to='/Stars'>Stars</NavLink></li>
      </ul>
    </nav>
    </div>
    {/* HTML shows "Loading" if images are still loading */}
          {
          this.state.loading ? <div className="loader"> <h3>Loading...</h3> </div> : 
            <Switch>
            {/* Switch that gives error 404 if error had occured */}
            {/* Also handling routes */}
              <Route exact path="/"/>
              <Route exact path="/search/:tag" render={() => <Photo data={this.state.photos} searchForm={this.state.tag} />} />
              <Route exact path="/Kittens" render={() => <Photo data={this.state.Kittens} searchForm="Kittens" />} />
              <Route exact path="/Stars" render={() => <Photo data={this.state.Stars} searchForm="Stars" />} />
              <Route exact path="/Puppies" render={() => <Photo data={this.state.Puppies} searchForm="Puppies" />} />
              <Route render={() => <div className="not-found"> <h3>Error 404</h3></div>} />
            </Switch>
          }
        </div>
      </BrowserRouter>
    );

  }
}

