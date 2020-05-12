import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dino from '../../assets/img/dino.gif';
import { compose } from 'recompose';
import axios from 'axios';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { GoSearch } from 'react-icons/go';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { withEmailVerification } from '../Session';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { FaPlane, FaPaperPlane } from 'react-icons/fa';

function searchingFor(term) {
  return function (name) {
    return (
      name.name.toLowerCase().includes(term.toLowerCase()) || !term
    );
  };
}

class CountriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      posts: [],
      term: '',
    };
  }

  show = () => this.setState({ open: true });
  handleConfirm = () => this.setState({ open: false });
  handleCancel = () => this.setState({ open: false });

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        console.log(response);
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchHandler = (event) => {
    this.setState({ term: event.target.value });
  };

  render() {
    const { posts, term } = this.state;
    console.log('placeListPage');
    return (
      <React.Fragment>
        <h1>
          <FaPaperPlane /> Explore{' '}
        </h1>
        <section className="ExplorePage">
          <div className="container exploreList">
            <form className="Explore_searchBar">
              <input
                type="text"
                onChange={this.searchHandler}
                value={term}
              />
              <GoSearch />
            </form>
            {posts.length
              ? posts.filter(searchingFor(term)).map((post) => (
                  <ul>
                    <li key={post.id}>
                      <img
                        className="Explore_list_flag"
                        src={post.flag}
                      />{' '}
                      <p>{post.name}</p>
                      <span className="Explore_List_Arrow">
                        <Modal
                          trigger={
                            <Button>
                              {' '}
                              <AiOutlineInfoCircle />
                            </Button>
                          }
                        >
                          <Modal.Header>
                            <h2 className="modalTitle">
                              <FaPlane className="ModalPlane" />{' '}
                              {post.name}{' '}
                            </h2>
                          </Modal.Header>
                          <Modal.Content image>
                            <Image
                              wrapped
                              size="medium"
                              className="modalFlag"
                              src={post.flag}
                            />
                            <Modal.Description>
                              <ul className="modalLi">
                                <li>
                                  <span>Capital city:</span>{' '}
                                  {post.capital}
                                </li>
                                <li>
                                  <span>Continent:</span>{' '}
                                  {post.region}
                                </li>
                                <li>
                                  <span>Population:</span>{' '}
                                  {post.population}
                                </li>
                                <li>
                                  <span>Timezone:</span>{' '}
                                  {post.timezones}
                                </li>
                                <li>
                                  <span>Currency:</span>{' '}
                                  {post.currencies[0].name} - (
                                  {post.currencies[0].symbol}){' '}
                                </li>
                                <li>
                                  <span>Calling code:</span> +
                                  {post.callingCodes[0]}
                                </li>
                              </ul>
                            </Modal.Description>
                          </Modal.Content>
                        </Modal>
                        <Link
                          className="homeLink"
                          to={`${ROUTES.EXPLORE}/${post.name}`}
                        />
                      </span>
                    </li>
                  </ul>
                ))
              : null}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default compose(withEmailVerification)(CountriesList);
