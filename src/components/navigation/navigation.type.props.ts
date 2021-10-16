export default interface Props {
  readonly onClose: () => void;
  readonly onOpen: () => void;
  readonly open: boolean | undefined;
}
