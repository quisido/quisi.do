import github from '../../../assets/portfolio/github.png';
import medium from '../../../assets/portfolio/medium.png';
import npm from '../../../assets/portfolio/npm.png';
import ArticlesPortfolio from './articles';
import GitHubPortfolio from './github';
import NpmPortfolio from './npm';

export default [
  {
    component: GitHubPortfolio,
    path: 'github',
    src: github,
    title: 'GitHub Repositories'
  },
  {
    component: NpmPortfolio,
    path: 'npm',
    src: npm,
    title: 'NPM Packages'
  },
  {
    component: ArticlesPortfolio,
    path: 'articles',
    src: medium,
    title: 'Publications'
  },
];
