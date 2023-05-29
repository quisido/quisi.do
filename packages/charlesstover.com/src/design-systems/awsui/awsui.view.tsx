import type { ReactElement } from 'react';
import type DesignSystemProps from '../../types/design-system-props';
import Banner from './components/banner';
import Button from './components/button';
import Cards from './components/cards';
import Checkbox from './components/checkbox';
import Chip from './components/chip';
import Container from './components/container';
import Div from './components/div';
import Header from './components/header';
import Link from './components/link';
import LoadingIcon from './components/loading-icon';
import Select from './components/select';
import Span from './components/span';
import Table from './components/table';
import Theme from './components/theme';
import Wrapper from './components/wrapper';

export default function Awsui<Card extends object, Row extends object>(
  props: Readonly<DesignSystemProps<Card, Row>>,
): ReactElement {
  switch (props.type) {
    case 'banner':
      return <Banner {...props.props} />;
    case 'button':
      return <Button {...props.props} />;
    case 'cards':
      return <Cards {...props.props} />;
    case 'checkbox':
      return <Checkbox {...props.props} />;
    case 'chip':
      return <Chip {...props.props} />;
    case 'container':
      return <Container {...props.props} />;
    case 'div':
      return <Div {...props.props} />;
    case 'header':
      return <Header {...props.props} />;
    case 'link':
      return <Link {...props.props} />;
    case 'loading-icon':
      return <LoadingIcon {...props.props} />;
    case 'select':
      return <Select {...props.props} />;
    case 'span':
      return <Span {...props.props} />;
    case 'table':
      return <Table {...props.props} />;
    case 'theme':
      return <Theme {...props.props} />;
    case 'wrapper':
      return <Wrapper {...props.props} />;
  }
}
