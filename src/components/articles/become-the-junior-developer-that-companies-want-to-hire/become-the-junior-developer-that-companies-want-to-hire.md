# Become the junior developer that companies want to hire.

![Banner](#banner.jpg)

## Preface 🔰

### Who am I, and why listen to me?

As a self-taught web developer, I struggled to overcome the barriers of entry
into the workforce. I had always done well in academia, which resulted in
professor affirmation, offers for advanced classes, and offers for
scholarships. I naively believed the workforce to behave similarly: that all I
had to do was _be good at what I did_ and the jobs would come to me. If I could
pass an interview the way I could pass a test, my encyclopedic knowledge of
programming would make finding a job easy.

That was not the case. Not only did job offers not come flooding into my
mailbox, but I could rarely get a response to an application when I reached out
to companies directly. What was wrong? I was a good developer. I could solve
real world problems. I had created applications and met customer demands.
Somehow, I was wholly unprepared for an enterprise setting.

I doubted my abilities. My ego was crushed. I thought I was intelligent; I
thought my projects pushed the envelope; but employers seemed to disagree. They
often did not see me as even worth interviewing. The most common feedback I
received was that they required a degree. The fact that I had invented
applications that generated revenue did not matter. I gave up and pursued other
passions, leaving web development as my favorite pastime that it had always
been.

Years later, I decided to pursue web development again after encouragement from
my peers. I was still passionate about it. I was good at it. It made me happy.
I attempted to re-enter the workforce, knowing from past experience that it
would not be easy. I took the act of job searching much more seriously than
before. The difference? _Humility._ You should _know what you don’t know_, and
I knew there was something I did not know about web development careers and how
they differed from web development as a hobby.

I spent a lot of time researching how to build a résumé and portfolio, the
interview process, and the soft skills of developer careers. I sought résumé
and portfolio critique. I did as many practice interviews as I could book. I
networked every opportunity. I still research these topics to this day. I take
a strong interest in them, as my ignorance of these topics held me back for so
long. I am passionate that other developers be prepared to face these issues as
well, especially those whom are self-taught, because they are often overlooked
in academia and barely existent online.

Since entering an enterprise setting, I have been involved with as much
interview training, sat on as many interview panels, and gathered as much
employee feedback as possible. I have applied what I have learned to everyone I
have come across who seeks it — from
[Reddit](https://www.reddit.com/user/Charles_Stover) threads to direct
[LinkedIn](https://linkedin.com/in/charles-stover) messages. This is my attempt
to publicly document and share this knowledge, in hopes that talented and
self-motivated developers receive the fair shot at success they deserve.

## Education 👨‍🎓👩‍🎓

![Education](#education.png)

Before you can become a junior developer that is in demand, you must first
become a _junior developer_. This article is not equivalent to an education.
This article is meant to be supplemental to an education, be it formal or
self-driven.

[Cracking the Coding Interview](https://amzn.to/2WLr1bG) by Gayle Laakmann
McDowell is another powerful education supplement that I highly recommend. It
covers many of the soft skills required by companies and ensures you know the
hard skills. You will see it recommended time and time again online, and it is
easily worth the $30 investment.

I encourage anyone to at least read the data structures and algorithms
discussed in that book. If you can already solve the problems, implement the
data structures, or create the algorithm, then just go to the next one. If you
find yourself feeling a bit hazy about the implementation details, I strongly
recommend that _you write it yourself_. This will add to your portfolio and
help solidify the knowledge in your mind. Learning through teaching is a
practice that I recommend often. It was my inspiration for
[Implementing Quicksort in JavaScript](https://medium.com/@Charles_Stover/implementing-quicksort-in-javascript-8044a8e2bf39)
and the resulting
[GitHub repository](https://github.com/CharlesStover/quicksort-js) and
[NPM package](https://www.npmjs.com/package/@charlesstover/quicksort) for my
portfolio.

You need go a step further than merely knowing what the data structures and
algorithms are. Understand the trade-offs between them. When do you choose one
over another? Which is more extensible and under what conditions? Which uses
less memory or is faster to execute? When would you want to trade memory or
efficiency for these other features and why? Knowing the answers to these
questions will be very important during your interview process. You will almost
certainly be asked to solve a problem that requires a complex data structure.
Whichever you choose, you will want to be able to defend. “It’s the first data
structure I remembered” does not fly too well on a production application, so
it does not fly too well in an interview either.

## Open Source 📄

![Open Source](#open-source.png)

It may seem obvious, but a portfolio is meant to be a document of your
accomplishments. So document them! _Thoroughly._ I mistakenly spent my earliest
years creating proprietary software. My server-side code was backed up to
several hard drives, and my JavaScript never saw user eyes without first being
ran through a minifier. I believed that in order for code to be profitable, it
can’t be copied. _I was wrong._

I encourage you to open-source as much as possible. Your Quicksort
implementation is not doing you any favors on your hard drive. Your
intro-to-programming video game may be embarrassingly inefficient, but you are
selling it short. These beginner’s projects show:

* You wanted to make something and have an interest in programming outside of
  work.
* You learned to make something and are both willing and capable of learning
  new technologies as needed.
* You completed a project without giving up. You can see challenges through to
  the end by overcoming obstacles instead of quitting.
* You _did something_. If you do not publish your code, employers will assume
  that you _never wrote it_. It is so much better to write something
  inefficient than to write nothing at all.

Since open-sourcing my projects, my development career has earned more value
than those projects ever offered me on their own. I have received a
[significant amount](https://github.com/CharlesStover/reactn/issues?q=is%3Aissue+is%3Aclosed)
of
[community feedback](https://github.com/CharlesStover/use-react-router/issues?q=is%3Aissue+is%3Aclosed)
that has allowed me to prioritize what is important to customers and account
for use cases and environments I never would have otherwise considered. Bugs
that never existed in my environment have arisen in others’. From their
reports, I have identified and learned from mistakes in my code designs. Today,
I can create components and packages that are extensible to more use cases than
just my personal portfolio and projects. These learned concepts and deeper
understanding of technologies improve my quality of work.

For each project, I recommend adding the following to its `README.md`:

* An actual name. `repository-name` is nice and automated, but try to give it a
  description that differentiates you from other candidates. Every candidate
  has a “TODO App” and “Shopping List.” Why is yours better? Try “React TODO
  App” or “MongoDB Shopping List.”
* An actual description. “TODO App” can mean a lot of things. It is obvious to
  you, because you made it. What
  [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
  does it support? Does it use server-side code? Who is the target audience?
  What problem are you solving and how? For example, my
  [Shopping List](https://github.com/CharlesStover/shopping-list) application
  “was created for my father, who needed a printable shopping list for his home
  care aides. To support his declining memory, the application keeps track of
  past items so that they may be re-added with ease.” I have put the customer
  first, identified a problem, and executed on a solution.
* The tech stack used. HTML, JavaScript, React, PHP, SQL, Docker? Let people
  know what you have experience using. Even if your project is not the cleanest
  code or optimal implementation, you have demonstrated that you understand
  these technologies at least in concept. You know what problems they solve,
  and that’s the largest hurdle. Perfecting their use can be learned on the
  job.
* Nobody, and I mean nobody, is going to clone your repository, install it,
  then run it locally just to see your work. Companies are often flooded with
  candidates (whether or not they are good candidates). They will just move on
  to the next candidate instead. At this point in time, to the company, you are
  statistically likely to be average. Their time is better spent researching
  another candidate than wasting time or muddying their machine. If your
  project is front end, consider deploying it to
  [GitHub Pages](https://pages.github.com/). If your project is not front end,
  consider adding screenshots of any GUI, linking to a live demonstration of
  any API, or documenting example inputs and outputs.
* Document your API, if there is one. This is good experience and practice for
  when you are creating highly used, production-facing APIs in an enterprise
  setting. Companies want good documentation, even for APIs that are only used
  internally. Every time an internal customer references the documentation,
  there is one less support ticket to answer and one more free hour for a
  developer to implement new features instead of support existing ones. When
  the creator of an API leaves the company, how quickly can their replacement
  support the service they have inherited? Many companies have been burned by
  this before, and they know that good documentation is indicative of
  team-thinking.

## Networking 🌐

![Wiki Meetup in Thailand at Central Embassy by Mohammed Galib Hasan (CC BY-SA 4.0, unmodified)](#networking.jpg)

If you want to _stand out_, then you first need to _stand_. Not only should
recruiters be able to find you, they should be impressed by what they see. Get
your name out there for good reasons.

### LinkedIn

Under your [Career Interests](https://www.linkedin.com/jobs/career-interests/),
let recruiters know you are open. Reply to every recruiter, whether or not you
want the job. Practice your professional communication skills. Practice putting
complex social and career situations into words that are articulate and
unoffensive. These skills will translate both into an interview setting and the
workplace. Sometimes, you know what you want, but you do not quite know how to
say it. Later, when you are interviewing, it will be good to be able to
articulate professionally what it is that you want from the job — and that is
the best way to get it.

Practice declining jobs in which you are not interested without burning
bridges. That recruiter may reach out to you in the future with a better
opportunity more tailored to your interests. Similarly, job offers that you do
not accept today may become desirable in the future. Finally, when you leave
your first job for your second, your experience in rejecting your current
company _without burning bridges_ will help you get that professional
recommendation.

Squeeze recruiters for information. Find out what is in demand. For what skills
are they looking? If they inform you that you are not the right fit for a
position, ask them why. What are you lacking? What should you study? If you
re-apply in some number of months, what do they want to see improved that could
land you the position? Drop your pride, up your humility, and understand that
employers want an employee that can _learn_, not one who thinks they know
everything already. A candidate telling me that they will be back and more
ready than ever is a very positive sign. It shows dedication, it shows an
eagerness to learn, and if they come back having corrected their faults, it
shows an ability to _succeed_ at their goals.

Learn your worth. No matter the recruiter or the position,
_what is the compensation_? What does a front end engineer make in Seattle?
What does a PHP developer make in Indiana? What does a React Native developer
make in India? (Do note that I included a location in each of these. The
greatest determinant for compensation is location!) When your first job offer
inevitably asks what you want as far as compensation,
_you will know what you are worth_. Do not be afraid to high-ball. Once they
have decided that they want you, they will not just reject you for asking too
much. They will counter with their max. This is better than low-balling
yourself and making closer to minimum wage than your worth. This is a great way
to lose motivation, feel underappreciated, and quickly burn out during your
job.

Link to your LinkedIn profile liberally. Your projects outside of LinkedIn
should include links to LinkedIn. Recruiters who are impressed by your work
need a way to contact you. Developers who are impressed by your work may be
willing to give you a job recommendation. For example, I end every Medium
article with “Follow me on
[LinkedIn](https://www.linkedin.com/in/charles-stover/).” At this time, these
link shares have resulted in 300 connections.

_Stand_, and allow yourself to be found.

### Twitter

Keep your Twitter account professional. It is okay to have personal tweets, but
do not have anything controversial. Build a following by constantly tweeting
what you have accomplished, and share your Twitter profile on your projects to
build a following. For example, I end every Medium article with “Follow me on
[Twitter](https://twitter.com/CharlesStover).” At this time, these link shares
have resulted in 300 followers.

Twitter is free marketing. I have never made a social tweet. I maintain a
strictly business Twitter account. If I post what I have made, people will see
it, interact with it, provide feedback, and share it. Related hashtags, such as
the tech stack, can be used to encourage bots to auto-retweet you for a wider
audience.

## Résumé 💼

![Photo by Staff Sgt. Kayla Rorick](#resume.jpg)

The million dollar questions are, “How do you stand out from every other
equally-education recent college graduate?” and “How do you show that your
self-taught education is equal to your accredited competitors?”

First things first, actually write your résumé! Be sure to keep your portfolio
and résumé in sync with your LinkedIn. This helps recruiters find you and know
what tech stacks with which you are familiar.

Keep your résumé to one page. If you think you need more than that because you
have accomplished so much, _you are wrong_. For reference, my 17 years of
experience is still
[a one page résumé](https://charlesstover.com/resume/2019-05/charles-stover-resume.pdf).
It is more likely that you are including information that should not be in a
résumé. Remember that a résumé gets you to the interview. The fine details come
up in the interview itself.

LinkedIn often has promotions with free courses on their
[LinkedIn Learning](https://www.linkedin.com/learning/) platform. Completing
these courses adds a Certification entry to your LinkedIn profile — an easy and
fun way to stand out.

Tailor your résumé to the job to which you are applying. Your education,
experience, interests, and goals can all be conversation pieces during the
interview. Know how they relate to the job. What formal training have you had
in the field? Note college courses or online training that were particularly
relevant. What past work applies specifically to this job? Remove unrelated
projects. An employer seeking a front end engineer is not going to ask you
about the time you coded a
[Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher) in assembly. Any
time they spend reading about it is mental fatigue that turns them off to you
as a candidate. Any time they spend discussing it with you is likely time
wasted. They will not have learned if you are a correct fit for the job. That
time is better spent informing them of your strengths in the field.

Do not list items on your résumé that you cannot defend. You may think you need
to lie to land an interview, but you do not. Part of the interview process is
specifically tailored to weed out liars. You achieve nothing more than wasting
everyone’s time, including your own. You will be grilled on technologies you
list and asked to give specifics about past projects. It will be apparent if
you are not familiar with these technologies or supposed projects. It does not
look good to claim to have worked with NPM and Travis CI but be unable to
define them, what problems they solved, or how these tools solved those
problems. Even vague answers can be red flags. You know that NPM managed your
Node packages, but you do not know what packages, why you would want this tool
on your project, or the commands you used. These are great reasons to
explicitly not hire you. It would realistically be a better choice to hire a
candidate who has no experience with NPM than one who supposedly does have
experience but cannot answer the above. The inexperienced candidate may be able
to learn. The lying candidate has demonstrated that they are incapable of
learning.

I do not say the above to make you fear of listing a technology on your résumé.
I say the above to emphasize how many candidates lie, how employers have come
to expect this, and to encourage you not to waste your time lying also. If you
honestly have experience with a technology, do not be afraid to list or discuss
it. If you do not know the answer to a question, admit it and explain why. “We
used NPM to install packages, but the only one I know is `npm install`. The
CI/CD pipeline ran the rest automatically, so I am unfamiliar with them.” You
have demonstrated that you do understand what the tool is and what the tool
solves. You have not demonstrated that you are incapable of learning. If I
heard this answer, I would think you are perfectly capable of learning NPM
better on the job. This is in stark contrast to the lying candidate who claims
to have used a tool but cannot offer specifics about when, where, or why.

_Sell yourself._ Don’t _sell yourself short_. Be proud of what you have
accomplished and be confident in your verbiage. You did not “make a small
website for a friend.” You “exceeded a customer’s expectations by delivering a
accessibility-compliant single-page-application and maintain it through an
Issues tracker and a CI/CD pipeline.” Employers do not want to make small
websites for your friends. They want to make SPAs, perform long-term
maintenance, track issues, and automate deployment. Your description of your
project should not be “I made a tic-tac-toe clone in the browser,” but “A React
application that implements Flux architecture through Redux, supporting
keyboard navigation and performing animations with CSS.” Remember to tailor the
résumé to the job and describe your projects with marketable terms.

## Mentality 🧠

![Mentality](#mentality.jpg)

### Know yourself.

Why are you interviewing for this position? What are your short and long term
goals, and how does this position help you reach them?

For my last interview, my answers to these questions were: I want a higher
skill ceiling than my previous job. I want to be challenged to learn new
technologies and better myself. I feel like I have plateaued at my previous
place of employment, and I have an intrinsic motivation to become the best
developer that I can be.

Employers want to know you are a right fit for them. If you just want money,
you are a right fit anywhere — meaning there is no guarantee you will remain
loyal when a competitor offers more. They do not want to invest in you if this
is the case. For my last career shift, I would have been willing to take a pay
cut, because it meant I could achieve greater things, and that is what mattered
to me.

### Interviews should not be scary.

You should have the mentality that every interview is good for you. Much the
way you can squeeze a recruiter for information, you can do the same with an
interview. Determine what tech stacks their company uses, what skills are in
demand, and why they are not interested. Some interviewers are unable to give
you this information without first passing it through to HR, so be sure to
follow up with HR after the interview. Use this information to better yourself
between interviews.

Interview places that you “know” you will not accept. I put know in quotes,
because I have known someone to accept a job offer after following this advice,
interviewing with no intention of accepting, finding out they actually loved
the company, and accepting the offer. This is my only morally-ambiguous piece
of advice. Practice interviewing at places in which you do not have an
interest. Squeeze them for the same information — what is their tech stack,
what skills do they value, in what areas can you improve, and if you receive a
job offer, what is your worth? These practice interviews will allow you to
better communicate your soft skills with less anxiety, and it will show when
you take on an interview for a job that you really want.

Treat your interview like it your first day on the job. This should help
decrease your anxiety and feel less pressure of being judged. Interact with the
interviewer as if they are your coworker. The entire point of an interview is
for the interviewer to determine how you would behave on the job. When they ask
you questions, it is not because this is a test, and you have to achieve 90% of
higher to pass. It is because they want to see your thought process when you
are given real world problems to solve. This thought process is not just
getting a right or wrong answer. How many edge cases did you consider? Could
you discern which did or did not apply to the customer in this use case? Did
you take extra steps when solving the problem to make your code extensible to
possible future modification, despite it not being a part of the current
feature request? Can you communicate difficult technical concepts, data
structures, algorithms, and their trade offs? Do you know when to ask for help,
or do you think you know everything? These are potential areas in which the
interviewer is taking notes, because these are the things you will work on in a
team. Engage your interviewer. Talk to them. Ask them questions. Describe your
thought process. Think out loud. Seeing them as a coworker really helps aid in
this task.

## Interview Preparation 👨‍💼👩‍💼

![Interview Preparation](#interview-preparation.jpg)

To prepare for your interview, make sure that you are intimately familiar with
the [S.T.A.R. format](https://en.wikipedia.org/wiki/Situation,_task,_action,_result).
When your interviewer asks you to describe an event, try your best to answer
with S.T.A.R. This ensures you provide the information for which your
interviewer is probing and that there is no miscommunication between the two of
you. If you misinterpreted the question, it should become clear by the
situation or task that you are answering the wrong question. If you are
answering the right question, the interviewer may be looking for relevant
experience (situation), problem identification or communication skills (task),
problem-solving or technical skills (action), or ability to deliver results,
compromise, or learn from mistakes (result). By answering with S.T.A.R., your
bases are covered, and strong communication is achieved.

### Create a list of your most impressive projects.

Impressive is subjective, but here I mean the projects that were the most
extensive or unique. You worked on a team, you worked with clients, you worked
with a manager, you received notable amounts of community feedback, it went
viral, or you accomplished something that took weeks not hours. Prepare to
reference your most impressive projects during behavioral questions. Unlike the
quantitative, encyclopedic knowledge of programming, sometimes you can draw a
blank when asked qualitative questions. You have so much experience writing for
loops and traversing arrays that it comes second nature when asked to do so.
Unfortunately, when asked to “name a time you had a disagreement with a
superior,” you might not have an example at the ready. Your mind can go blank
as you try to process this question.

>What if I’ve never had a disagreement? If I say I have not, do I sound
inexperienced or like I’m lying? And if I have, will it sound like I am
difficult to work with or oppositional? What counts as a disagreement? Who
counts as a superior? I have little to no work history! How am I supposed to
have disagreed with a superior?

Do be aware that behavioral questions do not typically mean _on the job_. In
the previous question, a superior may be a professor or a mentor. A
disagreement does not need to be a heated argument, but could be different
opinions on implementation details. You can make the question as generic as it
needs to be to have an answer, and that’s why creating a list of your most
impressive projects up front can be beneficial.

I highly recommend reading through
[Amazon’s Leadership Principles](https://www.amazon.jobs/en/principles). These
are some of the most well-rounded, all-encompassing, and rigorously tested
behavioral skills on the Internet. You would be hard-pressed to find a soft
skill that is both important and not on this list. For each leadership
principle, I recommend associating it with one of your impressive projects. Add
new projects or situations as needed.

* Project A — I _learned_ something new.
* Project B — I _invented_ a tool to aid the development process.

You may absolutely assign multiple principles to a single project, but I
strongly recommend that you have a project or situation for each principle. If
you find yourself unable to associate some, think harder. Try removing the job
or development aspect from the association. A time you were _frugal_ may have
just been in your day-to-day life, where you have managed to cut expenses in
order to prioritize paying off your student loans and therefore decreasing your
accumulated interest.

Once you have associated each leadership principle with a project or situation,
clean up your list. Remove projects or situations that are not associated with
any soft skills. You should be left with just a list of your _actual_ most
impressive projects.

Bring this list with you to interview. When you are asked a behavioral
question, if needed, read over this list to jog your memory of a time it
applied. Do not write the soft skills next to the projects. The point of this
list is to be memory-jarring. You should be able to skim it in a few seconds in
response to a question, not spend several minutes reading a page of summaries
before you answer. The combination of the location (project) and event
(question) should be enough to quickly jog your memory of any relevant
experience you may have.

It may feel odd to have to look at notes of your own life story in response to
a question about yourself, but do not worry. Interviewers are aware of the
impact of nervousness during the interview process, and I assure you no one
will mind that you took notes about your own soft skills. People struggle with
these questions more than any others, so your ability to answer at all will put
you ahead of the curve.

### Bring data.

Numbers are the universal language. They remove ambiguity and drive business
decisions. If you have data to accommodate your claims, bring it. By what
percentage did you boost productivity or revenue? How much money did you
generate? How much time did you save? If you only have qualitative results,
they are better than nothing. Measuring your efficiency not only drives home
the reality of your value, but it shows a mindset of valuing analytical data
that indicates that you will do the same on the job.

For example, some data I collected prior to my last interview:

* I reduced network traffic by 30% (gzipped) to 60% (non-gzipped) by
  implementing an opt-in (backwards compatible) compression algorithm on the
  API. This was not a complicated algorithm. I never had formal training in
  compression or data. I simply noticed that network traffic was being wasted
  downloading the same property names repeatedly. A quick Google search shows
  that
  [I was not the only one to seek this data conversion](https://stackoverflow.com/questions/37988451/convert-array-of-objects-to-an-object-of-arrays).
  I measured the packet sizes with and without this change, and viola — data.
* I simplified an existing internal testing framework for a project. This
  resulted in the development time for end-to-end testing decreasing from three
  days per path to just 1. This wasn’t rocket science. I was annoyed by how
  difficult the existing framework was to use, so I turned common commands into
  re-usable function calls. When the team responded that it was much nicer to
  use, I documented the change in development time.

### Be confident.

Confidence is important. Identify your insecurities and practice addressing
them. If your interviewer probes these aspects of you and your achievements,
you do not want to validate their concerns by lacking answers.

Do you lack a degree? Why? You thought it was the right choice for you to make.
Why? You decided that you could achieve academic equality to a college
graduate. Why? Leave your fear of judgment behind and take pride in your
decisions. If you cannot be confident that your choices thus far are the right
ones, how can you be trusted to make the right choices for the company?

I lack a degree in Computer Science. It was my biggest insecurity in my first
attempt to enter the workforce. Now, I am outspoken against learning software
development through college curriculums. I am confident that it was the correct
decision for me. It would have cost me too much money and provided too little
benefit. I learned faster on my own than in a classroom. I have worked with
developers in open-source, in person, and engaged myself in as many developer
communities as I can find. I have proven that I can comprehend and discuss
complex topics, so I am confident that a college education would not improve
myself as a developer. I can articulate that sentiment to an interviewer.

Once you understand yourself, practice articulating it. Practice by yourself,
putting your thoughts into words. There is a lot of emotion behind anxiety,
insecurity, and fear of judgment. It can be difficult to find the right words
to label emotionally-charged aspects of your life.
_Practice, practice, practice._ Once you believe you have adequately described
your biggest challenges, practice with friends and relatives. Then, practice
with mentors and coworkers. _Practice, practice, practice._

Seek _honest_ feedback. If your goal is to improve or land a job, you do not
want your ego stroked. You want constructive _criticism_. Make sure those close
to you know that they should not be afraid of hurting your ego, and make sure
your ego is not hurt by opportunities for self-improvement.

### In the end…

When the interview has come to a close, your interviewer will often give you an
opportunity to ask questions. Do ask questions. This shows that you have an
actual interest in the company and are not just here for a paycheck. Do not ask
about pay, vacation time, time off, or anything else that insinuates that you
care more about money than your career. Do ask about company culture,
opportunities for growth, team dynamics, tech stacks, and making sure you are a
good fit for each other. You are interviewing the company just as much as the
company is interviewing you. They do not want to put you in an environment
where you will not be happy — that’s the fastest way to have an employee quit.
Identify what is important to you, and ask how questions related to your short
and long term goals.

End the interview with a closing statement. It does not feel as natural as it
should, but after you have asked your questions, segue to a closing statement.
“I don’t have any further questions, but I do have one comment.” This is your
opportunity to describe your best qualities and what you can bring to the team.
Instead of the interviewer leaving the interview fixated on your minor
imperfections, have them leave with a positive thought. If your greatest
qualities did not come up naturally during conversation, now is your
opportunity to address them. During an interview, the bottom of my notes
reference a few of what I consider to be my strongest qualities. If they came
up already, I ignore them; if they did not come up, I bring them up now.
