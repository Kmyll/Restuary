import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import settings from '../../assets/help/settings.png'
import postAPlace from '../../assets/help/postAPlace.png'
import placeCard from '../../assets/help/placeCard.png'
import Explore from '../../assets/help/explore.png'
import { HashLink as Link } from 'react-router-hash-link';

export default class Help extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (

      <div className="container">
        <h1>Support Page</h1>
        <p className="helpPagePara">Welcome on the help page of Restuary. Here's everything you need to know about this application.<br/>
          However, if something is still unclear by the end of your reading, please send us a message at <a href="mailto:contact@restuary.com">contact@restuary.com</a>. <br/>
          We are here to help!
        </p>
        <section className="HelpFlex">
      <div className="elevator">
        <h2>Menu</h2>
        <ul>
          <li><Link to="#authentication">1. Authentication</Link></li>
          <li><Link to="#postPlace">2. Post a place</Link></li>
          <li><Link to="#seePlaces">3. See places</Link></li>
          <li><Link to="#profile">4. Your profile</Link></li>
          <li><Link to="#explore">5. Explore places</Link></li>
          <li><Link to="#rules">6. Rules of Restuary</Link></li>
        </ul>
      </div>
      <Accordion styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          <span id="authentication">1. Authentication</span>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            If you are here, you managed to sign up sucessfully. Here's a few things to know about authentication:
          </p>
          <ul>
            <li>You can login with a Facebook or a Google account</li>
            <li>You can create an account</li>
            <li>You can change your authentication method, by going on the "Settings" icon on your profile </li>
          </ul>
          <img className="helpFrame" src={settings} />

          <p>From there (please see picture above), you can reset your password if you do not remember it, change it by typing the old/new password or change your authentication method my linking Google or Facebook.</p>
          <p>Of course, if you do not remember your password while login in, you can click on "forgot password". You will have to type your email and a link to reset your password will be sent to you within a minute.</p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          <span id="postPlace">2. Post a place</span>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
           To post a place, please click on "Add a place" in the menu bar on top of the screen.
           <img className="helpFrame" src={postAPlace} />
          </p>
          <p>Here, you can see 6 fields:</p>
          <ul className="addPlaceList">
            <li><span>Add a picture:</span> Please note picture are very often protected by copyrights. You must post your own pictures (or someone's picture with the author's approval. Restuary is not responsible for pictures that violates copyrights and reserves the right to remove any post that violates Copyrights.</li>
            <li><span>Name of the place:</span> Give an explicit name for your place. it does not have to be unique</li>
            <li><span>Country:</span> Plase select in the scrolling menu the country of the place</li>
            <li><span>Region:</span> Plase select in the scrolling menu the region of the place (if any)</li>
            <li><span>Continent:</span> Plase select in the scrolling menu the continent of the place (if any)</li>
            <li><span>Description:</span> Plase write a description to make people want to go there! Feel free to add any transportation to go there and any activities you can do.</li>
          </ul>
          <p>Once these fields are completed, the submit button turns out from gey and you can submit your form. A notiifcation on the top right should tell you if your place has been sucessfully submitted.</p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          <span id="seePlaces">3. See places</span>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
        <div className="placeCard">
        <br/>
          <p>
     To Visualize and browse for places, you have to click on "Home" from the top navbar. Once you are on this page, you can type any keyword to make a research. From this page, you can visualise the places you posted as well as all the places the others users posted as well. <br/><br/>
     For each place, you will see :<br/><br/>
            a picture, as well as the given name, country, continent and the user who published it are displayed. On the bottom right of the card, the "Detail..." is a link to see more specific information regarding the given place.</p>



            <img src={placeCard}/>

            </div>

        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          <span id="profile">4. Your profile</span>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <p>
           Your profile page group the settings to change your account information.
           It will be improved in a second version of the application. (see "authentication").
          </p>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 4}
          index={4}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          <span id="explore">5. Explore places</span>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 4}>
          <p>
            This explore places page has been made so you can easily and quickly plan any trip, and have a glance over the country's generic information you need before packing. To visualize these information, please browse or search for a specific country.
          </p>

          <img className="helpFrame" src={Explore} />
          <p>From there, by clicking on the "i" on the right of any country, you can have access to its basic information like the capital city, continent, population, timezone, currency and calling code. Please note that some additional information will be added in a future version of Restuary.</p>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 5}
          index={5}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          <span id="rules">6. Rules of Restuary</span>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 5}>
          <p>
            Like any other application, Restuary have a set of rules. All users must be courteous to others, post relevant pictures regarding <b><em>unseen</em></b> places with pictures free from copyrights. the administrator reserves the right, if necessary to remove any post that would not meet the rules above, or remove any user from the application if necessary.
          </p>
        </Accordion.Content>
      </Accordion>
      </section>
      </div>

    )
  }
}




