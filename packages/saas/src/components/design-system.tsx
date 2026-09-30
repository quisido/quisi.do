import { type ReactElement } from 'react';
import { useNavigate } from 'react-router';

import {
  Link as DesignSystemLink,
  type LinkProps,
} from '../design-systems/memphis/index.js';
import noop from '../utils/noop.js';

export {
  Alert,
  AlertDialog,
  Application,
  Article,
  Banner,
  BlockQuote,
  Button,
  Checkbox,
  Code,
  Combobox,
  Comment,
  Complementary,
  ContentInfo,
  Definition,
  Dialog,
  Document,
  Emphasis,
  Feed,
  Figure,
  Grid,
  Heading,
  Image,
  List,
  ListBox,
  Log,
  Main,
  Mark,
  Marquee,
  Math,
  Menu,
  MenuBar,
  Meter,
  Navigation,
  Note,
  Paragraph,
  ProgressBar,
  RadioGroup,
  Region,
  Scrollbar,
  Search,
  SearchBox,
  Separator,
  SeparatorWidget,
  Slider,
  SpinButton,
  Status,
  Strong,
  Subscript,
  Suggestion,
  Superscript,
  Switch,
  Table,
  Tabs,
  Term,
  TextBox,
  Time,
  Timer,
  ToggleButton,
  Toolbar,
  Tooltip,
  Tree,
  TreeGrid,
} from '../design-systems/memphis/index.js';

export const Link = (props: LinkProps): ReactElement => {
  const navigate = useNavigate();

  return (
    <DesignSystemLink
      preventDefault
      {...props}
      onClick={(): void => {
        const promise = navigate(props.href);
        if (promise instanceof Promise) {
          void promise.catch(noop);
        }
      }}
    />
  );
};
