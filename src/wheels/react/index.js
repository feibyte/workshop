/**
 * From https://github.com/pomber/didact
 */

// eslint-disable-next-line max-classes-per-file
import React from './React.js';
import ReactDOM from './ReactDOM.js';

const container = document.getElementById('root');
// eslint-disable-next-line no-unused-vars
class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = { likes: Math.ceil(Math.random() * 100) };
  }

  like() {
    this.setState({
      likes: this.state.likes + 1,
    });
  }

  render() {
    const { name, url } = this.props;
    const { likes } = this.state;
    return React.createElement(
      'li',
      null,
      React.createElement(
        'button',
        { onClick: (e) => this.like() },
        likes,
        React.createElement('b', null, '❤'),
      ),
      React.createElement('a', { href: url }, name),
    );
  }
}

class App extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement('h1', null, 'Didact Stories'),
      React.createElement(
        'ul',
        null,
        ...this.props.stories.map((story) =>
          React.createElement(Story, { name: story.name, url: story.url }),
        ),
      ),
    );
  }
}

const stories = [
  { name: 'Didact introduction', url: 'http://bit.ly/2pX7HNn' },
  { name: 'Rendering DOM elements ', url: 'http://bit.ly/2qCOejH' },
  { name: 'Element creation and JSX', url: 'http://bit.ly/2qGbw8S' },
  { name: 'Instances and reconciliation', url: 'http://bit.ly/2q4A746' },
  { name: 'Components and state', url: 'http://bit.ly/2rE16nh' },
];
ReactDOM.render(React.createElement(App, { stories }), container);
