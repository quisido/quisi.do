import ellisImage from '../../../assets/quotes/ellis-gregory.jpg';
import kelseyImage from '../../../assets/quotes/kelsey-lavigne.jpg';
import malakaiImage from '../../../assets/quotes/malakai-whitston.jpg';

const ellis = quote => ({
  author: 'Ellis Gregory',
  company: 'UI/UX Graphic & Web Development Consultant at L. J. Smith & Associates',
  image: ellisImage,
  quote
});

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
  ellis('Charles has been extremely effective in collaboration and brainstorming design solutions and then translating them into fully developed products. His full-stack knowledge and expertise help guide my design decisions as they relate not only to the functional aspects of the product, but with the user experience as well.'),
  ellis('Charles is passionate about his work and never fails to meet whatever challenge comes his way. His leadership and “Nothing is impossible” mentality towards development is infectious and inspires myself and the others within the team to do their best.'),
  ellis('He has proven time and again that he is reliable, adaptive and intuitive while offering constructive feedback and the necessary positive friction that results in the creation of a high quality product.'),
  kelsey('He not only works through assignments quickly, but also lets us know areas we could improve... Charles did an incredible job of explaining technical issues and opportunities so that we could decide the best course of action.'),
  kelsey('His desire to improve the website and his ability to communicate complex technical issues to non-technical people really impressed me. I would recommend Charles to any employer - he is a real asset!'),
  malakai('Charles is an efficient, knowledgeable and trustworthy individual... He can not only perform but also advise on any task put before him and can lead a team as exceptionally as he can be part of one.'),
  malakai('I\'ve had the pleasure of employing Charles\' services many times over the past 15 years on projects requiring skills ranging from Frontend & Backend Development to SEO and Technical Writing... Charles receives my highest recommendation and any company would be lucky to have him.')
];
