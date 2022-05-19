import BionicReading from '../../../components/bionic-reading';
import ben from '../images/benjamin-tsai.png';
import carson from '../images/carson-stack.jpg';
import ellis from '../images/ellis-gregory.jpg';
import juneHo from '../images/june-ho-park.png';
import kelsey from '../images/kelsey-lavigne.jpg';
import logan from '../images/logan-mclain.jpg';
import malakai from '../images/malakai-whitston.jpg';
import mihir from '../images/mihir-patel.jpg';
import mustafa from '../images/mustafa-torun.jpg';
import qian from '../images/qian-zhang.png';
import rongdi from '../images/rongdi-lin.jpg';
import xinhe from '../images/xinhe-gao.png';
import type Quote from '../types/quote';

const QUOTES: readonly Quote[] = [
  // AWS
  {
    age: 25,
    author: 'Benjamin Tsai',
    company: 'Amazon Web Services',
    gender: 'male',
    image: ben,
    title: 'Front End Engineer',
    quote: (
      <>
        <p>
          <BionicReading>
            Charles has always been a great mentor for me. He knows a lot about
            good coding practices and industrial development. Most importantly,
            Charles is willing to share his advices and provide explanations
            accurately and thoroughly. Once I met a problem and wondered if
            there is a pre-existing design pattern that can solve it, so I asked
            for his advice. He immediately gave back a sound, comprehensive, and
            clever way to solve it, which really helped me. He also provided an
            example where the solution is already being used in our code so that
            I could better understand how it works and solves the problem under
            the given scenario.
          </BionicReading>
        </p>
        <p>
          <BionicReading>
            Charles is knowledgeable about the systems and tools our team is
            using. Almost every time, if I’m not sure about a tool we are using
            or how to resolve an issue in our system, I can reach out to him and
            get some direction. Even without context about a specific issue, he
            explains possible solutions to help me understand the subject matter
            better.
          </BionicReading>
        </p>
        <p>
          <BionicReading>
            Charles is able to demonstrate mentorship through shared packages he
            created and documentations he has written. He created several
            utility packages that our team and other teams can use and also
            wrote good documentation, allowing me to know what I need without
            repeated and unnecessary communication. These packages and
            documentations are good examples to me for how one can show
            ownership and improve the development environment.
          </BionicReading>
        </p>
      </>
    ),
  },
  {
    age: 25,
    author: 'Carson Stack',
    company: 'Amazon Web Services',
    gender: 'male',
    image: carson,
    title: 'Front End Engineer',
    quote: (
      <p>
        <BionicReading>
          Since joining the frontend team this year, I have benefited greatly
          from Charles’s mentorship. His ability to develop the engineers around
          him stems from his eagerness to help others and his technical acumen.
          Charles has a clear penchant for teaching: he is the first to offer
          assistance to a teammate who asks for help during standup, and he
          patiently spends time explaining concepts to others. He does not view
          a request for help as a burden or distraction, but rather becomes
          personally invested in the problems of others. In doing so, he is
          quick to explain not only a solution, but also makes it a point to
          teach why the solution works. Because of this, Charles is typically
          the first person I turn to for advice when stuck, knowing that he will
          turn my roadblock into a learning experience. Also, whenever I ask him
          for help, he always follows up afterwards to see whether his suggested
          solution worked as intended. While his attitude and approach to
          helping others are invaluable, his knowledge is what truly equips him
          to do so effectively. He is clearly a subject matter expert when it
          comes to front end technologies, allowing him to elucidate complex
          concepts, reliably respond to operational questions, and evaluate
          design tradeoffs. While discussing a recent design decision, he was
          able to confirm that my proposed idea would solve the problem at hand,
          but he had the foresight to point out that it would lead to
          complications in testing my feature down the road. He takes seriously
          his role in coaching others, and I can personally say that I have
          grown as an engineer as a result.
        </BionicReading>
      </p>
    ),
  },
  {
    age: 25,
    author: 'June Ho Park',
    company: 'Amazon Web Services',
    gender: 'male',
    image: juneHo,
    title: 'Front End Engineer',
    quote: (
      <p>
        <BionicReading>
          I am a front end engineer with no prior front end engineering
          experience. I have little experience in writing large-scale
          applications in JavaScript and no experience with React. Charles has
          been extremely helpful in my learning experience in front-end
          technology. On my first one-on-one with him, he assured me that I
          should not hesitate to ask for help and would be happy to mentor me.
          When I’m stuck on an issue regarding React or JavaScript, I can always
          rely on Charles to provide on guidance. In addition to providing a
          potential solution, Charles always takes extra time to explain, in
          detail, relevant React and JavaScript concepts to provide me with more
          context and equip me with tools to tackle issues on my own in the
          future. Charles also provides detailed comments on code reviews,
          including best coding practices and example code.
        </BionicReading>
      </p>
    ),
  },
  {
    author: 'Mihir Patel',
    company: 'Amazon Web Services',
    gender: 'male',
    image: mihir,
    title: 'Engineering Leader',
    quote: (
      <p>
        <BionicReading>
          Charles is exceptional at UI development and leading teams as a senior
          technical leader. During our collaboration, Charles helped us expand
          our service portfolio to add multiple new AWS services (Lambda and
          Container Insights). During these projects, Charles did an exceptional
          job leading his team and building a product that is well-received by
          our customers. I’ve really appreciated Charles’ technical leadership
          for our teams and have learned a lot from him. I would highly
          recommend Charles for senior technical leader roles. Given a chance, I
          would love to collaborate with him again.
        </BionicReading>
      </p>
    ),
  },
  {
    age: 35,
    author: 'Mustafa Torun',
    company: 'Amazon Web Services',
    gender: 'male',
    image: mustafa,
    title: 'Principal Software Engineer',
    quote: (
      <p>
        <BionicReading>
          I have observed Charles’s strengths over the years. I think Charles
          exhibits a very strong Customer Obsession. When we launched the new
          console for CloudWatch Logs, he stayed on top of the Reddit thread,
          answering customer questions, and bringing their feedback to the team.
          He proposed a program in CloudWatch Logs to form some sort of an
          on-call to respond customers on social media. I was very impressed
          with Charles’ output of Container Insights console dashboards. It is
          evident that Charles is technically strong in his domain.
        </BionicReading>
      </p>
    ),
  },
  {
    age: 30,
    author: 'Qian Zhang',
    company: 'Amazon Web Services',
    gender: 'female',
    image: qian,
    title: 'UX Designer',
    quote: (
      <>
        <p>
          <BionicReading>
            Charles is always happy to provide insights regarding my UX design.
            He is able to give input from an engineering perspective, like which
            steps need further clarification, where the edge cases may occur,
            and when to communicate errors to customers, etc.
          </BionicReading>
        </p>
        <p>
          <BionicReading>
            His input helps to complete UX workflows and minimize potential
            confusion that may happen for customers.
          </BionicReading>
        </p>
      </>
    ),
  },
  {
    age: 25,
    author: 'Rongdi Lin',
    company: 'Amazon Web Services',
    gender: 'male',
    image: rongdi,
    title: 'Front end engineer',
    quote: (
      <p>
        <BionicReading>
          Charles is an expert in front end areas and a reliable tech lead in
          the team. He always makes a solid design to build a high-performance
          web application. Meanwhile, he always shares his perspicacious
          insights when making the trade-off between business goal and
          engineering excellence, so as to help the team make the right
          decision. Also, he always provides the useful guidance with detailed
          explanation. Definitely a great guy to work with. Last but not the
          least, he is always passionate about the tech in the community. He
          shows his curiosity and impacts everyone around him.
        </BionicReading>
      </p>
    ),
  },
  {
    age: 25,
    author: 'Xinhe Gao',
    company: 'Amazon Web Services',
    gender: 'female',
    image: xinhe,
    title: 'Front End Engineer',
    quote: (
      <p>
        <BionicReading>
          I really appreciate the comments Charles leaves on my pull requests.
          They help me align my code with the rest of the projects. I consider
          Charles to be a good mentor. He is willing to share skills, knowledge,
          and expertise. If I ever have any technical questions I want to ask,
          he’s always happy to answer in details without feeling bothered. You
          can not only get help from him through direct message; whenever
          someone posts a question or asks for help in the team’s Slack channel,
          he’s always the first one to offer guidance or a solution if he knows
          the root cause. Besides this, he always gives valuable feedback in my
          code reviews. Instead of only pointing out the issue of my design, he
          always comes up with an alternative implementation with a code example
          and detailed justification to support it, which I think is really
          helpful to me. The majority of time, I was convinced without the need
          for back and forth comments. Sometimes I was inspired with a better
          idea based on that feedback. Overall, I’m glad I can have Charles in
          the team to offer mentoring.
        </BionicReading>
      </p>
    ),
  },

  // Walmart
  {
    age: 35,
    author: 'Ellis Gregory',
    company: 'RevUnit | Kitestring Technical Services',
    gender: 'male',
    image: ellis,
    title: 'Senior Product Designer',
    quote: (
      <>
        <p>
          <BionicReading>
            Charles has been extremely effective in collaboration and
            brainstorming design solutions and then translating them into fully
            developed products. His full-stack knowledge and expertise help
            guide my design decisions as they relate not only to the functional
            aspects of the product, but with the user experience as well. As a
            Designer, I would highly recommend working with Charles. He has
            proven time and again that he is reliable, adaptive and intuitive
            while offering constructive feedback and the necessary positive
            friction that results in the creation of a high quality product.
          </BionicReading>
        </p>
        <p>
          <BionicReading>
            Charles is passionate about his work and never fails to meet
            whatever challenge comes his way. His leadership and “Nothing is
            impossible” mentality towards development is infectious and inspires
            myself and the others within the team to do their best.
          </BionicReading>
        </p>
      </>
    ),
  },
  {
    age: 35,
    author: 'Logan McLain',
    company: 'Kitestring Technical Services',
    gender: 'male',
    image: logan,
    title: 'Vice President of Professional Services',
    quote: (
      <>
        <p>
          <BionicReading>
            I was very privileged to be Charles’ manager for a brief period of
            time. During that time, Charles demonstrated that he is an extremely
            gifted JavaScript developer; but beyond that, he demonstrated that
            he is a principled, driven individual. Charles cared deeply about
            JavaScript and React and was a great part of our local community, as
            well as the JavaScript community at large. He was always a good
            mentor to others and a good teammate. The thing that impressed me
            most about Charles is that he always sought feedback and he always
            wanted to get better, both as a person and a developer.
          </BionicReading>
        </p>
        <p>
          <BionicReading>
            I would happily work with Charles again!
          </BionicReading>
        </p>
      </>
    ),
  },
  {
    age: 40,
    author: 'Malakai Whitston',
    company: 'Ascent Agency',
    gender: 'male',
    image: malakai,
    title: 'Managing Director | Digital Marketing Consultant',
    quote: (
      <>
        <p>
          <BionicReading>
            In short: Charles is an efficient, knowledgeable and trustworthy
            individual.
          </BionicReading>
        </p>
        <p>
          <BionicReading>
            To elaborate: I’ve had the pleasure of employing Charles’s services
            many times over the past 15 years on projects requiring skills
            ranging from Frontend and Backend Development to SEO and Technical
            Writing. He always meets deadlines. His experience makes it so he
            can not only perform but also advise on any task put before him and
            can lead a team as exceptionally as he can be part of one. Charles
            receives my highest recommendation and any company would be lucky to
            have him.
          </BionicReading>
        </p>
      </>
    ),
  },
  /*
  {
    age: 25,
    author: 'Walter Sorto',
    company: 'Brain Corp | Walmart',
    gender: 'male',
    image: walter,
    title: 'Front End Web Developer',
    quote: (
      <p>
        Charles demonstrated a high level of expertise in JavaScript and was
        always willing to help out in the time we worked together.
      </p>
    ),
  },
  {
    age: 25,
    author: 'Sriram Rudraraju',
    company: 'Walmart',
    gender: 'male',
    image: sriram,
    title: 'Full Stack Developer',
    quote: (
      <p>
        Charles is the best friendly mentor I have ever had. He always had an
        answer to my questions.
      </p>
    ),
  },
  */

  // University of Arkansas
  {
    age: 35,
    author: 'Kelsey Lavigne',
    company: 'College of Engineering at University of Arkansas',
    gender: 'female',
    image: kelsey,
    title: 'Director of Employer Relations',
    quote: (
      <p>
        <BionicReading>
          When Charles started working for the Career Development Center, I knew
          quickly that we had gotten very lucky in hiring him. Charles has a lot
          of experience working in web development; for us, this translated to
          him not only working through assignments quickly, but also letting us
          know areas we could improve our website. I was his direct supervisor,
          but I had no background in web development at that point. Charles did
          an incredible job of explaining technical issues and opportunities
          with me so that we could decide the best course of action for moving
          forward. His desire to improve the website and his ability to
          communicate complex technical issues to non-technical people really
          impressed me. I would recommend Charles to any employer - he is a real
          asset!
        </BionicReading>
      </p>
    ),
  },
];

export default QUOTES;

/*
Charles’ thorough work and attention to detail is evident in the shared UI
components that he has been responsible for producing and maintaining.
Specifically, the AWS UI date/time range component is well-documented with a
Wiki page, 239-line README, and working Storybook demos. In my own experience
using the work that Charles has developed, he has supported me with timely and
knowledgeable responses that allowed me to incorporate the shared libraries into
the Amazon Detective console. - Luke Brassard, UX Designer | Software Engineer,
Amazon Web Services

My team is building a new EMR studio user interface in addition to what we have
in AWS console. The AWS UI date/time range component is a great component to
have in the frontend as customers need to filter cluster creation time with
relative and absolute time selection. Charles helped answer a lot of questions
related to use component in the frontend and quickly resolved any issues we have
when deploying the code. - Jenna Wei

Charles provided help instantly and continuously updated me with the progress of
issues so he definitely deserves praise. For PHD Console’s AWS UI upgrade, we
made use of the date/time range component maintained by CloudWatch. Charles was
quick to assist us with issues we faced with the component and continuously
updated me with the progress of root-causing the issue and possible bug fixes.
He helped bring known issues and technical limitations into perspective which
allowed our team to find workarounds instead of spending unnecessary time
debugging on our side. - Rashid, Mustafa

Charles helped us on our analytics platform we are developing for console
teams by helping us implement his date selector component. This component saved
us the trouble of having to develop a date selector from the ground up - and
took care of the many difficult use cases that arise when dealing with time and
dates. Not only did this component adhere to AWS UI design guidelines, it also
solved another requirement of allowing users to switch between absolute and
relative time ranges. Charles not only brought our attention to the component,
but also shared his knowledge of date selectors in general, some of the edge
cases involved, and assisted us in implementing the component, saving our team a
few days of development time. - Glenn Roman

I worked with Charles on integrating his AWS UI date/time component into the AWS
CloudTrail console. He is quick to investigate and resolve issues that I bring
to his attention. He was especially responsive and helpful when deep diving into
the Firefox/Safari issue with the widget and identifying the root cause. -
Amanda Anumra

Charles is a great expert of automation tests. Even though we're on different
teams, he helped me understand the new framework of CloudWatch Logs with his
full and active involvement. I appreciate his patience and expert knowledge.
Even more impressive is that he does not treat issues as a ‘one off problem,’ he
always follows up and tries to implement solutions before they become major
problems. - Jessica Chen

Charles helped me better understand the use case for React reference objects in
one of my code reviews. He helped me better understand when would be a good
situation to decouple the function in a React hook to a separated utility
function in another code review. Also, Charles shared the knowledge for how to
deploy a service via AWS CodePipeline. That was definitely a good learning
experience for me. - Rongdi Lin
*/
