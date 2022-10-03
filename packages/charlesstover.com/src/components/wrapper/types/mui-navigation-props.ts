export default interface MuiNavigationProps {
  readonly onClose: () => void;
  readonly onOpen: () => void;
  readonly open: boolean | undefined;
}
