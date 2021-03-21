import Box from '@awsui/components-react/box';
import carson from '../images/carson-stack.jpg';
import ellis from '../images/ellis-gregory.jpg';
import kelsey from '../images/kelsey-lavigne.jpg';
import logan from '../images/logan-mclain.jpg';
import malakai from '../images/malakai-whitston.jpg';
import mustafa from '../images/mustafa-torun.jpg';
import qian from '../images/qian-zhang.jpg';
import sriram from '../images/sriram-rudraraju.jpg';
import walter from '../images/walter-sorto.jpg';
import Quote from '../types/quote';

const QUOTES: Quote[] = [
  // AWS
  {
    author: 'Carson Stack',
    company: 'Amazon Web Services',
    image: carson,
    quote: (
      <Box variant="p">
        Since joining the frontend team this year, I have benefited greatly from
        Charles’s mentorship. Charles is clearly a subject matter expert when it
        comes to front end technologies, allowing him to elucidate complex
        concepts, reliably respond to operational questions, and evaluate design
        tradeoffs. I can personally say that I have grown as an engineer as a
        result.
      </Box>
    ),
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
    quote: (
      <>
        <Box variant="p">
          Charles is always happy to provide insights regarding my UX design. He
          is able to give input from an engineering perspective, like which
          steps need further clarification, where the edge cases may occur, and
          when to communicate errors to customers, etc.
        </Box>
        <Box variant="p">
          His input helps to complete UX workflows and minimize potential
          confusion that may happen for customers.
        </Box>
      </>
    ),
    title: 'UX Designer for CloudWatch Logs',
  },

  // Walmart
  {
    author: 'Ellis Gregory',
    company: 'Kitestring Technical Services | RevUnit',
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
    title: 'Senior Product Designer',
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
    title: 'Vice President of Professional Services',
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
    title: 'Director of Employer Relations',
  },
];

export default QUOTES;
