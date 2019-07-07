import React from 'react';
import Article from '../../article';
import banner from './banner.jpg';
import md from './become-the-junior-developer-that-companies-want-to-hire.md';
import education from './education.png';
import interviewPreparation from './interview-preparation.jpg';
import mentality from './mentality.jpg';
import networking from './networking.jpg';
import openSource from './open-source.png';
import resume from './resume.jpg';

const IMAGES = {
  'banner.jpg': banner,
  'education.png': education,
  'interview-preparation.jpg': interviewPreparation,
  'mentality.jpg': mentality,
  'networking.jpg': networking,
  'open-source.png': openSource,
  'resume.jpg': resume,
};

export default function BecomeTheJuniorDeveloperThatCompaniesWantToHire() {
  return (
    <Article images={IMAGES}>
      {md}
    </Article>
  );
}
