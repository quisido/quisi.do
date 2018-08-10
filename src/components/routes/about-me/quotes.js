import kelseyImage from '../../../assets/quotes/kelsey-lavigne.jpg';
import malakaiImage from '../../../assets/quotes/malakai-whitston.jpg';

const kelsey = quote => ({
  author: 'Kelsey Lavigne',
  company: 'Career Advisor | Internship Coordinator | Student Affairs Educator',
  image: kelseyImage,
  quote
});

const malakai = quote => ({
  author: 'Malakai Whitston',
  company: 'Managing Director at Ascent Agency, Digital Marketing Consultant',
  image: malakaiImage,
  quote
});

export default [
  kelsey('Charles did an incredible job of explaining technical issues and opportunities so that we could decide the best course of action.'),
  kelsey('He not only works through assignments quickly, but also lets us know areas we could improve.'),
  kelsey('His desire to improve the website and his ability to communicate complex technical issues to non-technical people really impressed me.'),
  kelsey('I would recommend Charles to any employer - he is a real asset!'),
  malakai('Charles is an efficient, knowledgeable and trustworthy individual.'),
  malakai('Charles receives my highest recommendation and any company would be lucky to have him.'),
  malakai('He can lead a team as exceptionally as he can be part of one.'),
  malakai('He can not only perform but also advise on any task put before him.')
];
