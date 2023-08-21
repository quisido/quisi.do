import withWrapper from '../../hocs/with-wrapper';
import Home from './home.view';
import useWrapperProps from './hooks/use-wrapper-props';

export default withWrapper(Home, useWrapperProps);
