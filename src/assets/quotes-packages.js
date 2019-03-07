import React from 'react';
import aaron from './quotes/aaron-dalton.jpg';
import ahmad from './quotes/ahmad-elsokkary.jpg';
import blake from './quotes/blake-moore.jpg';
import brian from './quotes/brian-barbour.jpg';
import jacob from './quotes/jacob-sowles.jpg';
import josh from './quotes/josh-sherman.jpg';
import juan from './quotes/juan-lanus.jpg';
import ryan from './quotes/ryan-clausen.jpg';

const reactn = (
  <a
    href="https://github.com/CharlesStover/reactn"
    rel="nofollow noopener noreferrer"
    target="_blank"
  >
    ReactN
  </a>
);

export default [

  // GitHub comments
  {
    author: 'Juan Lanus',
    company: null,
    image: juan,
    quote: [
      <>
        I’m learning React and Redux, through an extensive online course on
        Eduonix. I struggle, because I’m not as good at JavaScript; and as an
        old dog (aged 74), I don’t learn new tricks with ease. The course
        became overly complicated when it reached the Redux + Thunk section.
      </>,
      <>
        Although the instructor showed how to do it, to me it was very
        difficult to grok at a level in which I can be productive and not
        blindly cut and paste code I won’t fully understand for quite a while.
        It was taking me a really long time, weeks.
      </>,
      <>
        I was suspecting that all that boilerplate code production should be
        automated, then I stumbled upon [Charles’s NPM package] {reactn}. Now,
        I’m confident I will be able to develop the site I envision.
      </>
    ],
    title: null,
  },

  // Emails
  {
    author: 'Aaron Dalton',
    company: 'Alberta Energy Regulator',
    image: aaron,
    quote: (
      <>
        I am a huge fan of [Charles’s NPM package] {reactn}. I am using Relay
        Modern to handle all the GraphQL stuff, so I just needed a few
        key/value pairs to persist outside of that, and I was <em>dreading</em>
        {' '}diving into Redux. ReactN does everything I need, and the{' '}
        <code>addCallback</code> function works like a charm for persisting
        things to <code>sessionStorage</code>! Thanks!
      </>
    ),
    title: 'Senior Advisor',
  },

  // Articles
  {
    author: 'Josh Sherman',
    company: 'Mailshake, LLC',
    image: josh,
    quote: [
      <>
        Out of the box, React’s state management is limited to a component’s
        scope or at the very most, a shared state that requires wiring
        components together. This lack of a global state is why things like
        Redux and various other packages exist. [Charles’s NPM package]
        {' '}{reactn} is an extension of React that comes with state management
        at a global scale baked right in.
      </>,
      <>
        There’s a lot to like about ReactN. It’s an extension of React so
        there’s not a ton to learn, and it mirrors Hooks syntax quite a bit
        making it even more familiar. Overall, ReactN feels very lightweight in
        comparison to Redux and the familiar syntax made it a pleasure to work
        with. It feels more than sufficient for state management in React.
      </>
    ],
    title: 'Senior Engineer'
  },

  // Medium responses
  {
    author: 'Ahmad Elsokkary',
    company: 'Air Transfer',
    image: ahmad,
    quote: (
      <>
        I find [Charles’s NPM package] {reactn} useful, as it provides a global
        state with minimal overhead, which is very helpful for me. I frequently
        do prototypes and small-medium projects where I can appreciate such a
        library. Thanks! 👍
      </>
    ),
    title: 'Founder',
  },
  {
    author: 'Blake Moore',
    company: null,
    image: blake,
    quote: (
      <>
        For new developers, the Redux learning curve is a beast. I’ve met
        multiple senior level developers that all said Redux took 2–3 weeks to
        grasp and then one day it just clicked. [Charles’s NPM package]{' '}
        {reactn} is a great solution for managing global state in conjunction
        with the upcoming React Hooks implementation. I’m using the ReactN
        package on my new portfolio site with Next.js and so far it’s working
        awesome. I’m super impressed with how easy and fast both are so far.
      </>
    ),
    title: null,
  },
  {
    author: 'Brian Barbour',
    company: null,
    image: brian,
    quote: (
      <>
        I am new to both JavaScript and React, having only used JavaScript for
        four months. I was able to figure out [Charles’s NPM package]{' '}
        {reactn} and use it within an hour. Redux was really overwhelming for
        me and even Context was a bit confusing. I plan on playing with it so
        much more.
      </>
    ),
    title: null,
  },
  {
    author: 'Jacob Sowles',
    company: 'Vespa Group',
    image: jacob,
    quote: (
      <>
        Easy-to-use global state management is a common problem in the React
        world, and attempts to solve that problem (like [Charles’s NPM package]
        {' '}{reactn}) are beneficial to the development community.
      </>
    ),
    title: 'Full-Stack Developer',
  },

  // Tweets
  {
    author: 'Ryan Clausen',
    company: 'PTWeb4',
    image: ryan,
    quote: (
      <>
        For 100 days of code, I implemented global state via [Charles’s NPM
        package] {reactn}. It’s neat. I suggest developers look into it. I
        spent two days replacing my previous state management system with
        ReactN. That was the second complete state management overhaul for my
        {' '}<code>bubble-notes</code> project in a week. I like ReactN the best.
      </>
    ),
    title: 'Project Manager',
  },
];

// I love this project - I’ve been resisting redux forever after implementing it a couple of times, and typically only have a very few global variables I want access to everywhere - this is the perfect solution.
