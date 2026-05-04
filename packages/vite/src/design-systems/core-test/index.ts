import type { ComponentType } from 'react';
import type { AlertProps } from '../core/alert-props.js';
import type { AlertDialogProps } from '../core/alert-dialog-props.js';
import type { BannerProps } from '../core/banner-props.js';
import type { ContentInfoProps } from '../core/content-info-props.js';
import type { ApplicationProps } from '../core/application-props.js';
import type { DocumentProps } from '../core/document-props.js';
import type { ButtonProps } from '../core/button-props.js';
import type { CheckboxProps } from '../core/checkbox-props.js';
import type { ComboboxProps } from '../core/combobox-props.js';
import type { DialogProps } from '../core/dialog-props.js';
import type { FormProps } from '../core/form-props.js';
import type { GridProps } from '../core/grid-props.js';
import type { HeadingProps } from '../core/heading-props.js';
import type { ImageProps } from '../core/image-props.js';
import type { LinkProps } from '../core/link-props.js';
import type { ListProps } from '../core/list-props.js';
import type { MenuProps } from '../core/menu-props.js';
import type { MenuBarProps } from '../core/menu-bar-props.js';
import type { NavigationProps } from '../core/navigation-props.js';
import type { ParagraphProps } from '../core/paragraph-props.js';
import type { ProgressBarProps } from '../core/progress-bar-props.js';
import type { RadioGroupProps } from '../core/radio-group-props.js';
import type { SearchProps } from '../core/search-props.js';
import type { SectionFooterProps } from '../core/section-footer-props.js';
import type { SearchBoxProps } from '../core/search-box-props.js';
import type { SliderProps } from '../core/slider-props.js';
import type { SpinButtonProps } from '../core/spin-button-props.js';
import type { StatusProps } from '../core/status-props.js';
import type { SwitchProps } from '../core/switch-props.js';
import type { TabsProps } from '../core/tabs-props.js';
import type { TableProps } from '../core/table-props.js';
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
import testCombobox from './test-combobox.js';
import testDialog from './test-dialog.js';
import testForm from './test-form.js';
import testGrid from './test-grid.js';
import testMenuBar from './test-menu-bar.js';
import testMenu from './test-menu.js';
import testNavigation from './test-navigation.js';
import testProgressBar from './test-progress-bar.js';
import testRadioGroup from './test-radio-group.js';
import testSearchBox from './test-search-box.js';
import testSectionFooter from './test-section-footer.js';
import testSectionHeader from './test-section-header.js';
import testSearch from './test-search.js';
import testSeparatorWidget from './test-separator-widget.js';
import testSlider from './test-slider.js';
import testSpinButton from './test-spin-button.js';
import testStatus from './test-status.js';
import testSwitch from './test-switch.js';
import testTabs from './test-tabs.js';
import testTable from './test-table.js';
import testTextBox from './test-text-box.js';
import testTime from './test-time.js';
import testTimer from './test-timer.js';
import testTooltip from './test-tooltip.js';
import testToolbar from './test-toolbar.js';
import type { ListBoxProps } from '../core/list-box-props.js';
import testAlertDialog from './test-alert-dialog.js';
import testList from './test-list.js';
import testArticle from './test-article.js';
import testBlockQuote from './test-block-quote.js';
import testCode from './test-code.js';
import testComment from './test-comment.js';
import type { ArticleProps } from '../core/article-props.js';
import type { BlockQuoteProps } from '../core/block-quote-props.js';
import type { CodeProps } from '../core/code-props.js';
import type { CommentProps } from '../core/comment-props.js';
import testComplementary from './test-complementary.js';
import testDefinition from './test-definition.js';
import testEmphasis from './test-emphasis.js';
import testFeed from './test-feed.js';
import testFigure from './test-figure.js';
import testListBox from './test-list-box.js';
import testLog from './test-log.js';
import testMain from './test-main.js';
import testMark from './test-mark.js';
import testMarquee from './test-marquee.js';
import testMath from './test-math.js';
import testMeter from './test-meter.js';
import testRegion from './test-region.js';
import testScrollbar from './test-scrollbar.js';
import testSeparator from './test-separator.js';
import testStrong from './test-strong.js';
import testSubscript from './test-subscript.js';
import testSuperscript from './test-superscript.js';
import testNote from './test-note.js';
import testSuggestion from './test-suggestion.js';
import testTerm from './test-term.js';
import type { TermProps } from '../core/term-props.js';
import type { SuperscriptProps } from '../core/superscript-props.js';
import type { SuggestionProps } from '../core/suggestion-props.js';
import type { SubscriptProps } from '../core/subscript-props.js';
import type { ComplementaryProps } from '../core/complementary-props.js';
import type { DefinitionProps } from '../core/definition-props.js';
import type { EmphasisProps } from '../core/emphasis-props.js';
import type { FeedProps } from '../core/feed-props.js';
import type { FigureProps } from '../core/figure-props.js';
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
import type { TreeGridProps } from '../core/tree-grid-props.js';
import testTreeGrid from './test-tree-grid.js';
import { describe } from 'vitest';
import type { SectionHeaderProps } from '../core/section-header-props.js';
import type { SeparatorProps } from '../core/separator-props.js';
import type { SeparatorWidgetProps } from '../core/separator-widget-props.js';

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
  readonly Combobox: ComponentType<ComboboxProps>;
  readonly Comment: ComponentType<CommentProps>;
  readonly Complementary: ComponentType<ComplementaryProps>;
  readonly ContentInfo: ComponentType<ContentInfoProps>;
  readonly Definition: ComponentType<DefinitionProps>;
  readonly Dialog: ComponentType<DialogProps>;
  readonly Document: ComponentType<DocumentProps>;
  readonly Emphasis: ComponentType<EmphasisProps>;
  readonly Feed: ComponentType<FeedProps>;
  readonly Figure: ComponentType<FigureProps>;
  readonly Form: ComponentType<FormProps>;
  readonly Grid: ComponentType<GridProps>;
  readonly Heading: ComponentType<HeadingProps>;
  readonly Image: ComponentType<ImageProps>;
  readonly Link: ComponentType<LinkProps>;
  readonly List: ComponentType<ListProps>;
  readonly ListBox: ComponentType<ListBoxProps>;
  readonly Log: ComponentType<LogProps>;
  readonly Main: ComponentType<MainProps>;
  readonly Mark: ComponentType<MarkProps>;
  readonly Marquee: ComponentType<MarqueeProps>;
  readonly Math: ComponentType<MathProps>;
  readonly Menu: ComponentType<MenuProps>;
  readonly MenuBar: ComponentType<MenuBarProps>;
  readonly Meter: ComponentType<MeterProps>;
  readonly Navigation: ComponentType<NavigationProps>;
  readonly Note: ComponentType<NoteProps>;
  readonly Paragraph: ComponentType<ParagraphProps>;
  readonly ProgressBar: ComponentType<ProgressBarProps>;
  readonly RadioGroup: ComponentType<RadioGroupProps>;
  readonly Region: ComponentType<RegionProps>;
  readonly Scrollbar: ComponentType<ScrollbarProps>;
  readonly Search: ComponentType<SearchProps>;
  readonly SearchBox: ComponentType<SearchBoxProps>;
  readonly SectionFooter: ComponentType<SectionFooterProps>;
  readonly SectionHeader: ComponentType<SectionHeaderProps>;
  readonly Separator: ComponentType<SeparatorProps>;
  readonly SeparatorWidget: ComponentType<SeparatorWidgetProps>;
  readonly Slider: ComponentType<SliderProps>;
  readonly SpinButton: ComponentType<SpinButtonProps>;
  readonly Status: ComponentType<StatusProps>;
  readonly Strong: ComponentType<StrongProps>;
  readonly Subscript: ComponentType<SubscriptProps>;
  readonly Suggestion: ComponentType<SuggestionProps>;
  readonly Superscript: ComponentType<SuperscriptProps>;
  readonly Switch: ComponentType<SwitchProps>;
  readonly Table: ComponentType<TableProps>;
  readonly Tabs: ComponentType<TabsProps>;
  readonly Term: ComponentType<TermProps>;
  readonly TextBox: ComponentType<TextBoxProps>;
  readonly Time: ComponentType<TimeProps>;
  readonly Timer: ComponentType<TimerProps>;
  readonly Toolbar: ComponentType<ToolbarProps>;
  readonly Tooltip: ComponentType<TooltipProps>;
  readonly TreeGrid: ComponentType<TreeGridProps>;
}

export default function testDesignSystem(
  slug: string,
  {
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
    Form,
    Grid,
    Heading,
    Image,
    Link,
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
    SectionFooter,
    SectionHeader,
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
    Toolbar,
    Tooltip,
    TreeGrid,
  }: DesignSystem,
): void {
  describe(`Design System: ${slug}`, (): void => {
    testAlert(Alert);
    testAlertDialog(AlertDialog);
    testApplication(Application, { Article, Document });
    testArticle(Article);
    testBanner(Banner, { Document });
    testBlockQuote(BlockQuote);
    testButton(Button);
    testCheckbox(Checkbox);
    testCode(Code);
    testCombobox(Combobox);
    testComplementary(Complementary);
    testComment(Comment);
    testContentInfo(ContentInfo, { Document });
    testDefinition(Definition);
    testDialog(Dialog);
    testDocument(Document, { Banner, ContentInfo });
    testEmphasis(Emphasis);
    testFeed(Feed);
    testFigure(Figure);
    testForm(Form, { Region });
    testGrid(Grid);
    testHeading(Heading);
    testImage(Image);
    testLink(Link);
    testList(List);
    testListBox(ListBox);
    testLog(Log);
    testMain(Main, { Document });
    testMark(Mark);
    testMarquee(Marquee);
    testMath(Math);
    testMenu(Menu);
    testMenuBar(MenuBar);
    testMeter(Meter);
    testNavigation(Navigation);
    testNote(Note);
    testParagraph(Paragraph);
    testProgressBar(ProgressBar);
    testRadioGroup(RadioGroup);
    testRegion(Region);
    testScrollbar(Scrollbar);
    testSearch(Search);
    testSearchBox(SearchBox);
    testSectionFooter(SectionFooter);
    testSeparator(Separator);
    testSlider(Slider);
    testSpinButton(SpinButton);
    testSectionHeader(SectionHeader);
    testStatus(Status);
    testStrong(Strong);
    testSubscript(Subscript);
    testSuggestion(Suggestion);
    testSuperscript(Superscript);
    testSwitch(Switch);
    testTabs(Tabs);
    testTable(Table);
    testTerm(Term, { Definition });
    testTextBox(TextBox, { Form });
    testTime(Time);
    testTimer(Timer);
    testToolbar(Toolbar);
    testTooltip(Tooltip);
    testTreeGrid(TreeGrid);
    testSeparatorWidget(SeparatorWidget);
  });
}
