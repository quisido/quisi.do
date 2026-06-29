import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ComboboxProps } from '../core/combobox-props.js';
import useId from '../core/use-id.js';
import classes from './combobox.module.scss';

/**
 * A combobox is an input that controls another element, such as a list box or
 * grid, that can dynamically pop up to help the user set the value of the
 * input.
 * A combobox functionally combines a named input field with the ability to
 * assist value selection via a supplementary popup element. A combobox input is
 * a single-line text field that supports editing and typing.
 * The initial state of a combobox is collapsed. In the collapsed state, only
 * the combobox element and a separate, optional popup control button are
 * visible. A combobox is said to be expanded when both the combobox element
 * showing its current value and its associated popup element are visible.
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ | Combobox pattern}
 * @see {@link https://w3c.github.io/aria/#combobox | WAI-ARIA `combobox` role}
 */
export default function Combobox({
  disabled = false,
  label,
  onChange,
  options,
  readOnly = false,
  value,
}: ComboboxProps): ReactElement {
  const inputId: string = useId();
  const labelId: string = useId();
  const listBoxId: string = useId();
  const optionIdPrefix: string = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const selectionRangeRef = useRef<{ end: number; start: number } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [filterValue, setFilterValue] = useState(value);
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const filter: string = filterValue.toLocaleLowerCase();
  const filteredOptions: readonly string[] = options.filter(
    (option: string): boolean => {
      if (filter.length === 0) {
        return true;
      }

      return option.toLocaleLowerCase().startsWith(filter);
    },
  );
  const activeOption: string | undefined = filteredOptions[activeOptionIndex];
  const listboxVisible: boolean = expanded && filteredOptions.length > 0;
  const activeDescendant = (() => {
    if (!listboxVisible || activeOption === undefined) {
      return undefined;
    }

    return `${optionIdPrefix}-${activeOptionIndex}`;
  })();
  const interactive: boolean = !disabled && !readOnly;

  const closeListBox = (): void => {
    setExpanded(false);
    setActiveOptionIndex(-1);
  };

  const commitValue = (nextValue: string): void => {
    setInputValue(nextValue);
    setFilterValue(nextValue);
    setExpanded(false);
    setActiveOptionIndex(-1);
    onChange(nextValue);
  };

  const focusInput = (): void => {
    inputRef.current?.focus();
  };

  useEffect((): void => {
    setInputValue(value);
    setFilterValue(value);
    setActiveOptionIndex(-1);
  }, [value]);

  useEffect((): void => {
    if (filteredOptions.length === 0) {
      if (expanded) {
        setExpanded(false);
      }

      if (activeOptionIndex !== -1) {
        setActiveOptionIndex(-1);
      }

      return;
    }

    if (activeOptionIndex >= filteredOptions.length) {
      setActiveOptionIndex(filteredOptions.length - 1);
    }
  }, [activeOptionIndex, expanded, filteredOptions.length]);

  useEffect((): void => {
    const selectionRange = selectionRangeRef.current;
    const input = inputRef.current;

    if (selectionRange === null || input === null) {
      return;
    }

    input.setSelectionRange(selectionRange.start, selectionRange.end);
    selectionRangeRef.current = null;
  }, [inputValue]);

  useEffect((): void => {
    if (!listboxVisible || activeOption === undefined) {
      return;
    }

    const option: HTMLLIElement | null | undefined =
      optionRefs.current[activeOptionIndex];

    if (typeof option?.scrollIntoView !== 'function') {
      return;
    }

    option.scrollIntoView({
      block: 'nearest',
    });
  }, [activeOption, activeOptionIndex, listboxVisible]);

  useEffect((): VoidFunction => {
    const onDocumentPointerDown = (event: PointerEvent): void => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (rootRef.current?.contains(target)) {
        return;
      }

      closeListBox();
    };

    document.addEventListener('pointerdown', onDocumentPointerDown);

    return (): void => {
      document.removeEventListener('pointerdown', onDocumentPointerDown);
    };
  }, []);

  const onInputBlur = (_event: FocusEvent<HTMLInputElement>): void => {
    closeListBox();
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const nextFilterValue: string = event.currentTarget.value;
    const nextFilteredOptions: readonly string[] = options.filter(
      (option: string): boolean => {
        if (nextFilterValue.length === 0) {
          return true;
        }

        return option
          .toLocaleLowerCase()
          .startsWith(nextFilterValue.toLocaleLowerCase());
      },
    );
    const nextActiveOption: string | undefined = nextFilteredOptions[0];

    setFilterValue(nextFilterValue);

    if (nextActiveOption === undefined) {
      setInputValue(nextFilterValue);
      setActiveOptionIndex(-1);
      setExpanded(false);
      selectionRangeRef.current = null;
      return;
    }

    if (nextFilterValue.length === 0) {
      setActiveOptionIndex(-1);
    } else {
      setActiveOptionIndex(0);
    }

    setExpanded(nextFilterValue.length > 0);

    if (nextFilterValue.length === 0 || nextActiveOption === nextFilterValue) {
      setInputValue(nextFilterValue);
      selectionRangeRef.current = null;
      return;
    }

    setInputValue(nextActiveOption);
    selectionRangeRef.current = {
      end: nextActiveOption.length,
      start: nextFilterValue.length,
    };
  };

  const onInputFocus = (): void => {
    setActiveOptionIndex(-1);
  };

  const onInputClick = (): void => {
    if (!interactive || filteredOptions.length === 0) {
      return;
    }

    setExpanded(true);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (!interactive) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown': {
        if (filteredOptions.length === 0) {
          return;
        }

        event.preventDefault();
        setExpanded(true);
        setActiveOptionIndex((currentActiveOptionIndex: number): number => {
          if (currentActiveOptionIndex < 0) {
            return 0;
          }

          return (currentActiveOptionIndex + 1) % filteredOptions.length;
        });

        let nextOptionIndex: number = 0;

        if (activeOptionIndex >= 0) {
          nextOptionIndex = (activeOptionIndex + 1) % filteredOptions.length;
        }

        const nextOption: string = filteredOptions[nextOptionIndex] ?? '';
        setInputValue(nextOption);
        selectionRangeRef.current = {
          end: nextOption.length,
          start: nextOption.length,
        };
        break;
      }

      case 'ArrowUp': {
        if (filteredOptions.length === 0) {
          return;
        }

        event.preventDefault();
        setExpanded(true);
        setActiveOptionIndex((currentActiveOptionIndex: number): number => {
          if (currentActiveOptionIndex < 0) {
            return filteredOptions.length - 1;
          }

          return (
            (currentActiveOptionIndex - 1 + filteredOptions.length) %
            filteredOptions.length
          );
        });

        let nextOptionIndex: number = filteredOptions.length - 1;

        if (activeOptionIndex >= 0) {
          nextOptionIndex =
            (activeOptionIndex - 1 + filteredOptions.length) %
            filteredOptions.length;
        }

        const nextOption: string = filteredOptions[nextOptionIndex] ?? '';
        setInputValue(nextOption);
        selectionRangeRef.current = {
          end: nextOption.length,
          start: nextOption.length,
        };
        break;
      }

      case 'Enter': {
        if (!listboxVisible || activeOption === undefined) {
          return;
        }

        event.preventDefault();
        commitValue(activeOption);
        break;
      }

      case 'Escape': {
        event.preventDefault();
        setInputValue(value);
        setFilterValue(value);
        closeListBox();
        break;
      }

      case 'Tab': {
        if (listboxVisible && activeOption !== undefined) {
          commitValue(activeOption);
        }

        break;
      }

      default:
        break;
    }
  };

  const onButtonMouseDown = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  const onButtonClick = (): void => {
    if (!interactive || filteredOptions.length === 0) {
      return;
    }

    setExpanded((currentExpanded: boolean): boolean => !currentExpanded);
    focusInput();
  };

  const onOptionMouseDown = (event: MouseEvent<HTMLLIElement>): void => {
    event.preventDefault();
  };

  const onOptionClick = (option: string): void => {
    commitValue(option);
    focusInput();
  };

  return (
    <div aria-haspopup="listbox" className={classes['root']} ref={rootRef}>
      <label className={classes['label']} htmlFor={inputId} id={labelId}>
        {label}
      </label>
      <div>
        <input
          aria-activedescendant={activeDescendant}
          aria-autocomplete="both"
          aria-controls={listBoxId}
          aria-expanded={listboxVisible}
          className={classes['combobox']}
          disabled={disabled}
          id={inputId}
          onBlur={onInputBlur}
          onChange={onInputChange}
          onClick={onInputClick}
          onFocus={onInputFocus}
          onKeyDown={onInputKeyDown}
          readOnly={readOnly}
          ref={inputRef}
          role="combobox"
          type="text"
          value={inputValue}
        />
        <button
          aria-controls={listBoxId}
          aria-expanded={listboxVisible}
          aria-label={`Show ${label} options`}
          className={classes['button']}
          disabled={!interactive || filteredOptions.length === 0}
          onClick={onButtonClick}
          onMouseDown={onButtonMouseDown}
          tabIndex={-1}
          type="button"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            height="16"
            style={{ forcedColorAdjust: 'auto' }}
            width="18"
          >
            <polygon
              className="arrow"
              fill="currentcolor"
              fillOpacity="0.75"
              points="3,6 15,6 9,14"
              strokeWidth="0"
            />
          </svg>
        </button>
      </div>
      <ul
        aria-disabled={disabled}
        aria-labelledby={labelId}
        aria-readonly={readOnly}
        className={classes['listbox']}
        hidden={!listboxVisible}
        id={listBoxId}
        role="listbox"
      >
        {filteredOptions.map((option: string, index: number): ReactElement => (
          <li
            aria-selected={index === activeOptionIndex}
            className={classes['option']}
            id={`${optionIdPrefix}-${index}`}
            key={option}
            onClick={(): void => {
              onOptionClick(option);
            }}
            onMouseDown={onOptionMouseDown}
            onPointerEnter={(): void => {
              setActiveOptionIndex(index);
            }}
            ref={(node: HTMLLIElement | null): void => {
              optionRefs.current[index] = node;
            }}
            role="option"
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
