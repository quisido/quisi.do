import { type ReactElement } from 'react';
import type DesignSystemProps from '../../types/design-system-props';
import Banner from './components/banner';
import Button from './components/button';
import Cards from './components/cards';
import Checkbox from './components/checkbox';
import Chip from './components/chip';
import Div from './components/div';
import Header from './components/header';
import Input from './components/input';
import Link from './components/link';
import LoadingIcon from './components/loading-icon';
import Section from './components/section';
import Select from './components/select';
import Span from './components/span';
import Table from './components/table';
import Theme from './components/theme';

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
