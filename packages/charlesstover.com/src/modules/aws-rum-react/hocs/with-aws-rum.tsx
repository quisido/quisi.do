import { AwsRum } from 'aws-rum-web';
import { ComponentType, ReactElement } from 'react';
import useAwsRum from '../hooks/use-aws-rum';

interface HocProps {
  readonly awsRum: AwsRum;
}

export default function withAwsRum<Props extends HocProps>(
  Component: ComponentType<Props>,
): ComponentType<Omit<Props, keyof HocProps>> {
  return function AwsRumComponent(
    props: Omit<Props, keyof HocProps>,
  ): ReactElement {
    const awsRum: AwsRum = useAwsRum();
    return <Component {...(props as Props)} awsRum={awsRum} />;
  };
}