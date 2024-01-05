const createSessionId = (): string => {
  return '1234567890';
};

export default function getSessionId(): string {
  const id: null | string = window.sessionStorage.getItem('id');
  if (id !== null) {
    return id;
  }

  const newId: string = createSessionId();
  window.sessionStorage.setItem('id', newId);
  return newId;
}
