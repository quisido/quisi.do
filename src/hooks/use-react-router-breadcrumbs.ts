import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import { History } from 'history';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

interface State<
  Item extends BreadcrumbGroupProps.Item = BreadcrumbGroupProps.Item
> {
  handleFollow: BreadcrumbGroupProps<Item>['onFollow'];
}

export default function useReactRouterBreadcrumbs<
  Item extends BreadcrumbGroupProps.Item = BreadcrumbGroupProps.Item
>(): State<Item> {
  const history: History<unknown> = useHistory();

  const handleFollow = useCallback(
    (e: CustomEvent<BreadcrumbGroupProps.ClickDetail<Item>>): void => {
      e.preventDefault();
      history.push(e.detail.href);
    },
    [history],
  );

  return {
    handleFollow,
  };
}
