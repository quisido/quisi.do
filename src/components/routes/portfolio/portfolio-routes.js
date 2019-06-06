import github from '../../../assets/portfolio/github.png';
import medium from '../../../assets/portfolio/medium.png';
import npm from '../../../assets/portfolio/npm.png';
import GitHubPortfolio from './github';
import MediumPortfolio from './medium';
import NpmPortfolio from './npm';

export default [
  {
    component: GitHubPortfolio,
    path: 'github',
    src: github,
    title: 'GitHub Repositories'
  },
  {
    component: MediumPortfolio,
    path: 'medium',
    src: medium,
    title: 'Medium Publications'
  },
  {
    component: NpmPortfolio,
    path: 'npm',
    src: npm,
    title: 'NPM Packages'
  }
];
