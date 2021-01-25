import Box from '@awsui/components-react/box';
import CarsonQuote from '../components/carson-quote.view';
import EllisQuote from '../components/ellis-quote.view';
import KelseyQuote from '../components/kelsey-quote.view';
import LoganQuote from '../components/logan-quote.view';
import MalakaiQuote from '../components/malakai-quote.view';
import QianQuote from '../components/qian-quote.view';
import carson from '../images/carson-stack.png';
import ellis from '../images/ellis-gregory.jpg';
import kelsey from '../images/kelsey-lavigne.jpg';
import logan from '../images/logan-mclain.jpg';
import malakai from '../images/malakai-whitston.jpg';
import mustafa from '../images/mustafa-torun.png';
import qian from '../images/qian-zhang.png';
import sriram from '../images/sriram-rudraraju.jpg';
import walter from '../images/walter-sorto.jpg';
import Quote from '../types/quote';

const QUOTES: Quote[] = [
  // AWS
  {
    author: 'Carson Stack',
    company: 'Amazon Web Services',
    image: carson,
    quote: <CarsonQuote />,
    title: 'Software Engineer for CloudWatch Logs',
  },
  {
    author: 'Mustafa Torun',
    company: 'Amazon Web Services',
    image: mustafa,
    quote: (
      <Box variant="p">
        I have observed Charles&rsquo;s strengths over the years. I think
        Charles exhibits a very strong Customer Obsession. When we launched the
        new console for CloudWatch Logs, he stayed on top of the Reddit thread,
        answering customer questions, and bringing their feedback to the team.
        He proposed a program in CloudWatch Logs to form some sort of an on-call
        to respond customers on social media. I was very impressed with Charles’
        output of Container Insights console dashboards. It is evident that
        Charles is technically strong in his domain.
      </Box>
    ),
    title: 'Principal Software Engineer for CloudWatch Logs',
  },
  {
    author: 'Qian Zhang',
    company: 'Amazon Web Services',
    image: qian,
    quote: <QianQuote />,
    title: 'UX Designer for CloudWatch Logs',
  },

  // Walmart
  {
    author: 'Ellis Gregory',
    company: 'Kitestring Technical Services | RevUnit',
    image: ellis,
    quote: <EllisQuote />,
    title: 'Senior Product Designer',
  },
  {
    author: 'Logan McLain',
    company: 'Kitestring Technical Services',
    image: logan,
    quote: <LoganQuote />,
    title: 'Vice President of Professional Services',
  },
  {
    author: 'Malakai Whitston',
    company: 'Ascent Agency',
    image: malakai,
    quote: <MalakaiQuote />,
    title: 'Managing Director | Digital Marketing Consultant',
  },
  {
    author: 'Walter Sorto',
    company: 'Brain Corp | Walmart',
    image: walter,
    quote: (
      <Box variant="p">
        Charles demonstrated a high level of expertise in JavaScript and was
        always willing to help out in the time we worked together.
      </Box>
    ),
    title: 'Front End Web Developer',
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
    title: 'Full Stack Developer',
  },

  // University of Arkansas
  {
    author: 'Kelsey Lavigne',
    company: 'College of Engineering at University of Arkansas',
    image: kelsey,
    quote: <KelseyQuote />,
    title: 'Director of Employer Relations',
  },

  // Medium responses
  /*
  {
    author: '金浩楠 (Jin Haonan)',
    quote: <Box variant="p">Charles is handsome and awesome.</Box>,
  },
  */
];

export default QUOTES;
