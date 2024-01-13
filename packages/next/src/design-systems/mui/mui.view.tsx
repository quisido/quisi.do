import { type ReactElement } from 'react';
import type DesignSystemProps from '../../types/design-system-props.js';
import Banner from './components/banner/index.js';
import Button from './components/button/index.js';
import Cards from './components/cards/index.js';
import Checkbox from './components/checkbox/index.js';
import Chip from './components/chip/index.js';
import Div from './components/div/index.js';
import Header from './components/header/index.js';
import Input from './components/input/index.js';
import Link from './components/link/index.js';
import LoadingIcon from './components/loading-icon/index.js';
import Section from './components/section.js';
import Select from './components/select/index.js';
import Span from './components/span/index.js';
import Table from './components/table/index.js';
import Theme from './components/theme/index.js';

export default function Mui<Card extends object, Row extends object>({
  props,
  type,
}: Readonly<DesignSystemProps<Card, Row>>): ReactElement {
  switch (type) {
    case 'banner':
      return <Banner {...props} />;
    case 'button':
      return <Button {...props} />;
    case 'cards':
      return <Cards {...props} />;
    case 'checkbox':
      return <Checkbox {...props} />;
    case 'chip':
      return <Chip {...props} />;
    case 'div':
      return <Div {...props} />;
    case 'header':
      return <Header {...props} />;
    case 'input':
      return <Input {...props} />;
    case 'link':
      return <Link {...props} />;
    case 'loading-icon':
      return <LoadingIcon {...props} />;
    case 'section':
      return <Section {...props} />;
    case 'select':
      return <Select {...props} />;
    case 'span':
      return <Span {...props} />;
    case 'table':
      return <Table {...props} />;
    case 'theme':
      return <Theme {...props} />;
  }
}
