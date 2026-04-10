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
import testArticle from './test-article.jsx';
import testBlockQuote from './test-block-quote.js';
import testCode from './test-code.jsx';
import testComment from './test-comment.jsx';
import type { ArticleProps } from '../core/article-props.js';
import type { BlockQuoteProps } from '../core/block-quote-props.js';
import type { CodeProps } from '../core/code-props.js';
import type { CommentProps } from '../core/comment-props.js';
import testComplementary from './test-complementary.jsx';
import testDefinition from './test-definition.jsx';
import testDeletion from './test-deletion.jsx';
import testEmphasis from './test-emphasis.jsx';
import testFeed from './test-feed.jsx';
import testFigure from './test-figure.jsx';
import testGroup from './test-group.jsx';
import testInsertion from './test-insertion.jsx';
import testListBox from './test-list-box.jsx';
import testLog from './test-log.jsx';
import testMain from './test-main.jsx';
import testMark from './test-mark.jsx';
import testMarquee from './test-marquee.jsx';
import testMath from './test-math.jsx';
import testMeter from './test-meter.jsx';
import testRegion from './test-region.jsx';
import testScrollbar from './test-scrollbar.jsx';
import testSeparator from './test-separator.jsx';
import testStrong from './test-strong.jsx';
import testSubscript from './test-subscript.jsx';
import testSuperscript from './test-superscript.jsx';
import testNote from './test-note.jsx';
import testSuggestion from './test-suggestion.jsx';
import testTerm from './test-term.jsx';
import type { TermProps } from '../core/term-props.js';
import type { SuperscriptProps } from '../core/superscript-props.js';
import type { SuggestionProps } from '../core/suggestion-props.js';
import type { SubscriptProps } from '../core/subscript-props.js';
import type { ComplementaryProps } from '../core/complementary-props.js';
import type { DefinitionProps } from '../core/definition-props.js';
import type { DeletionProps } from '../core/deletion-props.js';
import type { EmphasisProps } from '../core/emphasis-props.js';
import type { FeedProps } from '../core/feed-props.js';
import type { FigureProps } from '../core/figure-props.js';
import type { GroupProps } from '../core/group-props.js';
import type { InsertionProps } from '../core/insertion-props.js';
import type { LogProps } from '../core/log-props.js';
import type { MainProps } from '../core/main-props.js';
import type { MarkProps } from '../core/mark-props.js';
import type { MarqueeProps } from '../core/marquee-props.js';
import type { MathProps } from '../core/math-props.js';
import type { MeterProps } from '../core/meter-props.js';
import type { NoteProps } from '../core/note-props.js';
import type { RegionProps } from '../core/region-props.js';
import type { ScrollbarProps } from '../core/scrollbar-props.js';
import type { StrongProps } from '../core/strong-props.js';

interface DesignSystem {
  readonly Alert: ComponentType<AlertProps>;
  readonly AlertDialog: ComponentType<AlertDialogProps>;
  readonly Application: ComponentType<ApplicationProps>;
  readonly Article: ComponentType<ArticleProps>;
  readonly Banner: ComponentType<BannerProps>;
  readonly BlockQuote: ComponentType<BlockQuoteProps>;
  readonly Button: ComponentType<ButtonProps>;
  readonly Checkbox: ComponentType<CheckboxProps>;
  readonly Code: ComponentType<CodeProps>;
  readonly ComboBox: ComponentType<ComboBoxProps>;
  readonly Comment: ComponentType<CommentProps>;
  readonly Complementary: ComponentType<ComplementaryProps>;
  readonly ContentInfo: ComponentType<ContentInfoProps>;
  readonly Definition: ComponentType<DefinitionProps>;
  readonly Deletion: ComponentType<DeletionProps>;
  readonly Dialog: ComponentType<DialogProps>;
  readonly Document: ComponentType<DocumentProps>;
  readonly Emphasis: ComponentType<EmphasisProps>;
  readonly Feed: ComponentType<FeedProps>;
  readonly Figure: ComponentType<FigureProps>;
  readonly Form: ComponentType<FormProps>;
  readonly Grid: ComponentType<GridProps>;
  readonly Group: ComponentType<GroupProps>;
  readonly Heading: ComponentType<HeadingProps>;
  readonly Image: ComponentType<ImageProps>;
  readonly Insertion: ComponentType<InsertionProps>;
  readonly Link: ComponentType<LinkProps>;
  readonly List: ComponentType<ListProps>;
  readonly ListBox: ComponentType<ListBoxProps>;
  readonly ListItem: ComponentType<ListItemProps>;
  readonly Log: ComponentType<LogProps>;
  readonly Main: ComponentType<MainProps>;
  readonly Mark: ComponentType<MarkProps>;
  readonly Marquee: ComponentType<MarqueeProps>;
  readonly Math: ComponentType<MathProps>;
  readonly Menu: ComponentType<MenuProps>;
  readonly MenuBar: ComponentType<MenuBarProps>;
  readonly MenuItem: ComponentType<MenuItemProps>;
  readonly MenuItemCheckbox: ComponentType<MenuItemCheckboxProps>;
  readonly MenuItemRadio: ComponentType<MenuItemRadioProps>;
  readonly Meter: ComponentType<MeterProps>;
  readonly Navigation: ComponentType<NavigationProps>;
  readonly Note: ComponentType<NoteProps>;
  readonly Option: ComponentType<OptionProps>;
  readonly Paragraph: ComponentType<ParagraphProps>;
  readonly ProgressBar: ComponentType<ProgressBarProps>;
  readonly Radio: ComponentType<RadioProps>;
  readonly RadioGroup: ComponentType<RadioGroupProps>;
  readonly Region: ComponentType<RegionProps>;
  readonly Scrollbar: ComponentType<ScrollbarProps>;
  readonly Search: ComponentType<SearchProps>;
  readonly SearchBox: ComponentType<SearchBoxProps>;
  readonly Separator: ComponentType;
  readonly Slider: ComponentType<SliderProps>;
  readonly SpinButton: ComponentType<SpinButtonProps>;
  readonly Status: ComponentType<StatusProps>;
  readonly Strong: ComponentType<StrongProps>;
  readonly Subscript: ComponentType<SubscriptProps>;
  readonly Suggestion: ComponentType<SuggestionProps>;
  readonly Superscript: ComponentType<SuperscriptProps>;
  readonly Switch: ComponentType<SwitchProps>;
  readonly Tab: ComponentType<TabProps>;
  readonly Table: ComponentType<TableProps>;
  readonly TabList: ComponentType<TabListProps>;
  readonly TabPanel: ComponentType<TabPanelProps>;
  readonly Term: ComponentType<TermProps>;
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
  Article,
  Banner,
  BlockQuote,
  Button,
  Checkbox,
  Code,
  ComboBox,
  Comment,
  Complementary,
  ContentInfo,
  Definition,
  Deletion,
  Dialog,
  Document,
  Emphasis,
  Feed,
  Figure,
  Form,
  Grid,
  Group,
  Heading,
  Image,
  Insertion,
  Link,
  List,
  ListBox,
  ListItem,
  Log,
  Main,
  Mark,
  Marquee,
  Math,
  Menu,
  MenuBar,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  Meter,
  Navigation,
  Note,
  Option,
  Paragraph,
  ProgressBar,
  Radio,
  RadioGroup,
  Region,
  Scrollbar,
  Search,
  SearchBox,
  Separator,
  Slider,
  SpinButton,
  Status,
  Strong,
  Subscript,
  Suggestion,
  Superscript,
  Switch,
  Tab,
  Table,
  TabList,
  TabPanel,
  Term,
  TextBox,
  Time,
  Timer,
  Toolbar,
  Tooltip,
}: DesignSystem): void {
  testAlert(Alert);
  testAlertDialog(AlertDialog);
  testApplication(Application, { Banner, ContentInfo });
  testArticle(Article);
  testBanner(Banner, { Document });
  testBlockQuote(BlockQuote);
  testButton(Button);
  testCheckbox(Checkbox);
  testCode(Code);
  testComboBox(ComboBox);
  testComplementary(Complementary);
  testComment(Comment);
  testContentInfo(ContentInfo, { Document });
  testDefinition(Definition);
  testDeletion(Deletion);
  testDialog(Dialog);
  testDocument(Document, { Banner, ContentInfo });
  testEmphasis(Emphasis);
  testFeed(Feed);
  testFigure(Figure);
  testForm(Form);
  testGrid(Grid);
  testGroup(Group);
  testHeading(Heading);
  testImage(Image);
  testInsertion(Insertion);
  testLink(Link);
  testList(List, { ListItem });
  testListBox(ListBox, { Option });
  testListItem(ListItem, { List });
  testLog(Log);
  testMain(Main);
  testMark(Mark);
  testMarquee(Marquee);
  testMath(Math);
  testMenu(Menu, { MenuItem });
  testMenuBar(MenuBar, { MenuItem });
  testMenuItem(MenuItem, { Menu });
  testMenuItemCheckbox(MenuItemCheckbox, { Menu });
  testMenuItemRadio(MenuItemRadio, { Menu });
  testMeter(Meter);
  testNavigation(Navigation);
  testNote(Note);
  testOption(Option, { ListBox });
  testParagraph(Paragraph);
  testProgressBar(ProgressBar);
  testRadio(Radio);
  testRadioGroup(RadioGroup, { Radio });
  testRegion(Region);
  testScrollbar(Scrollbar);
  testSearch(Search);
  testSearchBox(SearchBox);
  testSeparator(Separator);
  testSlider(Slider);
  testSpinButton(SpinButton);
  testStatus(Status);
  testStrong(Strong);
  testSubscript(Subscript);
  testSuggestion(Suggestion);
  testSuperscript(Superscript);
  testSwitch(Switch);
  testTab(Tab, { TabList });
  testTabList(TabList, { Tab });
  testTabPanel(TabPanel);
  testTable(Table);
  testTerm(Term, { Definition });
  testTextBox(TextBox);
  testTime(Time);
  testTimer(Timer);
  testToolbar(Toolbar);
  testTooltip(Tooltip);
}
