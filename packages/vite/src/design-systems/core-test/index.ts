import type { ComponentType } from 'react';
import type { AlertProps } from '../core/alert-props.js';
import type { AlertDialogProps } from '../core/alert-dialog-props.js';
import type { BannerProps } from '../core/banner-props.js';
import type { ContentInfoProps } from '../core/content-info-props.js';
import type { ApplicationProps } from '../core/application-props.js';
import type { DocumentProps } from '../core/document-props.js';
import type { ButtonProps } from '../core/button-props.js';
import type { CheckboxProps } from '../core/checkbox-props.js';
import type { ComboBoxProps } from '../core/combo-box-props.js';
import type { DialogProps } from '../core/dialog-props.js';
import type { FormProps } from '../core/form-props.js';
import type { GridProps } from '../core/grid-props.js';
import type { HeadingProps } from '../core/heading-props.js';
import type { ImageProps } from '../core/image-props.js';
import type { LinkProps } from '../core/link-props.js';
import type { ListProps } from '../core/list-props.js';
import type { ListItemProps } from '../core/list-item-props.js';
import type { MenuProps } from '../core/menu-props.js';
import type { MenuBarProps } from '../core/menu-bar-props.js';
import type { MenuItemProps } from '../core/menu-item-props.js';
import type { MenuItemCheckboxProps } from '../core/menu-item-checkbox-props.js';
import type { MenuItemRadioProps } from '../core/menu-item-radio-props.js';
import type { NavigationProps } from '../core/navigation-props.js';
import type { OptionProps } from '../core/option-props.js';
import type { ParagraphProps } from '../core/paragraph-props.js';
import type { ProgressBarProps } from '../core/progress-bar-props.js';
import type { RadioProps } from '../core/radio-props.js';
import type { RadioGroupProps } from '../core/radio-group-props.js';
import type { SearchProps } from '../core/search-props.js';
import type { SearchBoxProps } from '../core/search-box-props.js';
import type { SliderProps } from '../core/slider-props.js';
import type { SpinButtonProps } from '../core/spin-button-props.js';
import type { StatusProps } from '../core/status-props.js';
import type { SwitchProps } from '../core/switch-props.js';
import type { TabProps } from '../core/tab-props.js';
import type { TabListProps } from '../core/tab-list-props.js';
import type { TableProps } from '../core/table-props.js';
import type { TabPanelProps } from '../core/tab-panel-props.js';
import type { TextBoxProps } from '../core/text-box-props.js';
import type { TimeProps } from '../core/time-props.js';
import type { TimerProps } from '../core/timer-props.js';
import type { ToolbarProps } from '../core/toolbar-props.js';
import type { TooltipProps } from '../core/tooltip-props.js';
import testAlert from './test-alert.js';
import testApplication from './test-application.js';
import testBanner from './test-banner.js';
import testButton from './test-button.js';
import testContentInfo from './test-content-info.js';
import testDocument from './test-document.js';
import testHeading from './test-heading.js';
import testImage from './test-image.js';
import testLink from './test-link.js';
import testParagraph from './test-paragraph.js';
import testCheckbox from './test-checkbox.js';
import testComboBox from './test-combo-box.js';
import testDialog from './test-dialog.js';
import testForm from './test-form.js';
import testGrid from './test-grid.js';
import testMenuBar from './test-menu-bar.js';
import testMenuItemCheckbox from './test-menu-item-checkbox.js';
import testMenuItemRadio from './test-menu-item-radio.js';
import testMenuItem from './test-menu-item.js';
import testMenu from './test-menu.js';
import testNavigation from './test-navigation.js';
import testOption from './test-option.js';
import testProgressBar from './test-progress-bar.js';
import testRadioGroup from './test-radio-group.js';
import testRadio from './test-radio.js';
import testSearchBox from './test-search-box.js';
import testSearch from './test-search.js';
import testSlider from './test-slider.js';
import testSpinButton from './test-spin-button.js';
import testStatus from './test-status.js';
import testSwitch from './test-switch.js';
import testTabList from './test-tab-list.js';
import testTabPanel from './test-tab-panel.js';
import testTab from './test-tab.js';
import testTable from './test-table.js';
import testTextBox from './test-text-box.js';
import testTime from './test-time.js';
import testTimer from './test-timer.js';
import testTooltip from './test-tooltip.js';
import testToolbar from './test-toolbar.js';
import type { ListBoxProps } from '../core/list-box-props.js';
import testAlertDialog from './test-alert-dialog.jsx';
import testList from './test-list.jsx';
import testListItem from './test-list-item.jsx';

interface DesignSystem {
  readonly Alert: ComponentType<AlertProps>;
  readonly AlertDialog: ComponentType<AlertDialogProps>;
  readonly Application: ComponentType<ApplicationProps>;
  readonly Banner: ComponentType<BannerProps>;
  readonly Button: ComponentType<ButtonProps>;
  readonly Checkbox: ComponentType<CheckboxProps>;
  readonly ComboBox: ComponentType<ComboBoxProps>;
  readonly ContentInfo: ComponentType<ContentInfoProps>;
  readonly Dialog: ComponentType<DialogProps>;
  readonly Document: ComponentType<DocumentProps>;
  readonly Form: ComponentType<FormProps>;
  readonly Grid: ComponentType<GridProps>;
  readonly Heading: ComponentType<HeadingProps>;
  readonly Image: ComponentType<ImageProps>;
  readonly Link: ComponentType<LinkProps>;
  readonly List: ComponentType<ListProps>;
  readonly ListBox: ComponentType<ListBoxProps>;
  readonly ListItem: ComponentType<ListItemProps>;
  readonly Menu: ComponentType<MenuProps>;
  readonly MenuBar: ComponentType<MenuBarProps>;
  readonly MenuItem: ComponentType<MenuItemProps>;
  readonly MenuItemCheckbox: ComponentType<MenuItemCheckboxProps>;
  readonly MenuItemRadio: ComponentType<MenuItemRadioProps>;
  readonly Navigation: ComponentType<NavigationProps>;
  readonly Option: ComponentType<OptionProps>;
  readonly Paragraph: ComponentType<ParagraphProps>;
  readonly ProgressBar: ComponentType<ProgressBarProps>;
  readonly Radio: ComponentType<RadioProps>;
  readonly RadioGroup: ComponentType<RadioGroupProps>;
  readonly Search: ComponentType<SearchProps>;
  readonly SearchBox: ComponentType<SearchBoxProps>;
  readonly Slider: ComponentType<SliderProps>;
  readonly SpinButton: ComponentType<SpinButtonProps>;
  readonly Status: ComponentType<StatusProps>;
  readonly Switch: ComponentType<SwitchProps>;
  readonly Tab: ComponentType<TabProps>;
  readonly Table: ComponentType<TableProps>;
  readonly TabList: ComponentType<TabListProps>;
  readonly TabPanel: ComponentType<TabPanelProps>;
  readonly TextBox: ComponentType<TextBoxProps>;
  readonly Time: ComponentType<TimeProps>;
  readonly Timer: ComponentType<TimerProps>;
  readonly Toolbar: ComponentType<ToolbarProps>;
  readonly Tooltip: ComponentType<TooltipProps>;
}

export default function testDesignSystem({
  Alert,
  AlertDialog,
  Application,
  Banner,
  Button,
  Checkbox,
  ComboBox,
  ContentInfo,
  Dialog,
  Document,
  Form,
  Grid,
  Heading,
  Image,
  Link,
  List,
  ListBox,
  ListItem,
  Menu,
  MenuBar,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  Navigation,
  Option,
  Paragraph,
  ProgressBar,
  Radio,
  RadioGroup,
  Search,
  SearchBox,
  Slider,
  SpinButton,
  Status,
  Switch,
  Tab,
  Table,
  TabList,
  TabPanel,
  TextBox,
  Time,
  Timer,
  Toolbar,
  Tooltip,
}: DesignSystem): void {
  testAlert(Alert);
  testAlertDialog(AlertDialog);
  testApplication(Application, { Banner, ContentInfo });
  testBanner(Banner, { Document });
  testContentInfo(ContentInfo, { Document });
  testDocument(Document, { Banner, ContentInfo });
  testHeading(Heading);
  testImage(Image);
  testLink(Link);
  testParagraph(Paragraph);
  testButton(Button);
  testCheckbox(Checkbox);
  testComboBox(ComboBox);
  testDialog(Dialog);
  testForm(Form);
  testGrid(Grid);
  testList(List, { ListItem });
  testListItem(ListItem, { List });
  testMenu(Menu, { MenuItem });
  testMenuBar(MenuBar, { MenuItem });
  testMenuItem(MenuItem, { Menu });
  testMenuItemCheckbox(MenuItemCheckbox, { Menu });
  testMenuItemRadio(MenuItemRadio, { Menu });
  testNavigation(Navigation);
  testOption(Option, { ListBox });
  testProgressBar(ProgressBar);
  testRadio(Radio);
  testRadioGroup(RadioGroup, { Radio });
  testSearch(Search);
  testSearchBox(SearchBox);
  testSlider(Slider);
  testSpinButton(SpinButton);
  testStatus(Status);
  testSwitch(Switch);
  testTab(Tab, { TabList });
  testTable(Table);
  testTabList(TabList, { Tab });
  testTabPanel(TabPanel);
  testTextBox(TextBox);
  testTime(Time);
  testTimer(Timer);
  testToolbar(Toolbar);
  testTooltip(Tooltip);
}
