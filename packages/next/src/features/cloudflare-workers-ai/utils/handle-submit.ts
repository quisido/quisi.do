import { type FormEvent } from 'react';

export default function handleSubmit(e: FormEvent<HTMLFormElement>): false {
  e.preventDefault();
  return false;
}
