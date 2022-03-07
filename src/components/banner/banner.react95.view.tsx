import { Modal } from '@react95/core';
import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import type Props from './types/props';

export default function React95Banner({
  children,
  onDismiss,
}: Readonly<Props>): ReactElement {
  const [isOpen, setIsOpen] = useState(true);
  const handleCloseModal = useCallback((): void => {
    setIsOpen(false);
    if (filterByDefined(onDismiss)) {
      onDismiss();
    }
  }, [onDismiss]);

  if (!isOpen) {
    return <>{null}</>;
  }

  return (
    <>
      <Modal
        closeModal={handleCloseModal}
        style={{ marginBottom: '1em' }}
        title=""
      >
        {children}
      </Modal>
      <br />
      <br />
    </>
  );
}
