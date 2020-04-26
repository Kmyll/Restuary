import React, { Component } from 'react';
import font from '../../assets/img/font.png';
import plane from '../../assets/img/plane.png';
import prep from '../../assets/img/prep.png';
import feedback from '../../assets/img/feedback.png';
import footer from '../../assets/img/footer.png';

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="LandingHeader">
          <img className="LandingMainPic" src={font} />
          <h1>
            Welcome to Restuary <br />
            <span>Travel planning made easier</span>
          </h1>
        </section>
        <h2 className="sectionTitle"> How it works</h2>
        <section className="Presentation">
          <div>
            <img className="cardPic" src={prep} />{' '}
            <p>
              Register or login <br /> to browse the best local places
            </p>{' '}
          </div>
          <div>
            {' '}
            <img className="cardPic" src={plane} />{' '}
            <p>
              Prepare your trip
              <br /> and enjoy your journey
            </p>{' '}
          </div>
          <div>
            {' '}
            <img className="cardPic" src={feedback} />
            <p>
              Post the best unseen <br />
              place you visited during your trip
            </p>
          </div>
        </section>
        <section>
          <img className="footer" src={footer} />{' '}
        </section>
      </React.Fragment>
    );
  }
}

export default Header;
