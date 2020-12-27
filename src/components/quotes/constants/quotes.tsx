import Box from '@awsui/components-react/box';
import ellis from '../images/ellis-gregory.jpg';
import jin from '../images/jin-haonan.png';
import kelsey from '../images/kelsey-lavigne.jpg';
import logan from '../images/logan-mclain.jpg';
import malakai from '../images/malakai-whitston.jpg';
import sriram from '../images/sriram-rudraraju.jpg';
import walter from '../images/walter-sorto.jpg';
import Quote from '../types/quote';

const QUOTES: Quote[] = [
  {
    author: 'Ellis Gregory',
    company: 'Kitestring Technical Services',
    image: ellis,
    quote: (
      <>
        <Box variant="p">
          Charles has been extremely effective in collaboration and
          brainstorming design solutions and then translating them into fully
          developed products. His full-stack knowledge and expertise help guide
          my design decisions as they relate not only to the functional aspects
          of the product, but with the user experience as well. As a Designer, I
          would highly recommend working with Charles. He has proven time and
          again that he is reliable, adaptive and intuitive while offering
          constructive feedback and the necessary positive friction that results
          in the creation of a high quality product.
        </Box>
        <Box variant="p">
          Charles is passionate about his work and never fails to meet whatever
          challenge comes his way. His leadership and “Nothing is impossible”
          mentality towards development is infectious and inspires myself and
          the others within the team to do their best.
        </Box>
      </>
    ),
    title: 'UI/UX Graphic | Web Development Consultant',
  },
  {
    author: 'Kelsey Lavigne',
    company: 'University of Arkansas Career Development Center',
    image: kelsey,
    quote: (
      <Box variant="p">
        When Charles started working for the Career Development Center, I knew
        quickly that we had gotten very lucky in hiring him. Charles has a lot
        of experience working in web development; for us, this translated to him
        not only working through assignments quickly, but also letting us know
        areas we could improve our website. I was his direct supervisor, but I
        had no background in web development at that point. Charles did an
        incredible job of explaining technical issues and opportunities with me
        so that we could decide the best course of action for moving forward.
        His desire to improve the website and his ability to communicate complex
        technical issues to non-technical people really impressed me. I would
        recommend Charles to any employer - he is a real asset!
      </Box>
    ),
    title: 'Career Advisor | Internship Coordinator | Student Affairs Educator',
  },
  {
    author: 'Logan McLain',
    company: 'Kitestring Technical Services',
    image: logan,
    quote: (
      <>
        <Box variant="p">
          I was very privileged to be Charles’ manager for a brief period of
          time. During that time, Charles demonstrated that he is an extremely
          gifted JavaScript developer; but beyond that, he demonstrated that he
          is a principled, driven individual. Charles cared deeply about
          JavaScript and React and was a great part of our local community, as
          well as the JavaScript community at large. He was always a good mentor
          to others and a good teammate. The thing that impressed me most about
          Charles is that he always sought feedback and he always wanted to get
          better, both as a person and a developer.
        </Box>
        <Box variant="p">I would happily work with Charles again!</Box>
      </>
    ),
    title: 'Account Executive',
  },
  {
    author: 'Malakai Whitston',
    company: 'Ascent Agency',
    image: malakai,
    quote: (
      <>
        <Box variant="p">
          In short: Charles is an efficient, knowledgeable and trustworthy
          individual.
        </Box>
        <Box variant="p">
          To elaborate: I’ve had the pleasure of employing Charles’s services
          many times over the past 15 years on projects requiring skills ranging
          from Frontend and Backend Development to SEO and Technical Writing. He
          always meets deadlines. His experience makes it so he can not only
          perform but also advise on any task put before him and can lead a team
          as exceptionally as he can be part of one. Charles receives my highest
          recommendation and any company would be lucky to have him.
        </Box>
      </>
    ),
    title: 'Managing Director | Digital Marketing Consultant',
  },
  {
    author: 'Walter Sorto',
    company: 'Walmart',
    image: walter,
    quote: (
      <Box variant="p">
        Charles demonstrated a high level of expertise in JavaScript and was
        always willing to help out in the time we worked together.
      </Box>
    ),
    title: 'Software Engineer',
  },
  {
    author: 'Sriram Rudraraju',
    company: 'Walmart',
    image: sriram,
    quote: (
      <Box variant="p">
        Charles is the best friendly mentor I have ever had. He always had an
        answer to my questions.
      </Box>
    ),
    title: 'Web Developer',
  },

  // Medium responses
  {
    author: '金浩楠 (Jin Haonan)',
    image: jin,
    quote: <Box variant="p">Charles is handsome and awesome.</Box>,
  },
];

export default QUOTES;
