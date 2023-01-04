import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import type { ReactElement } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import Container from '../../../../components/container';
import Div from '../../../../components/div';
import Link from '../../../../components/link';

export default function DashboardContent(): ReactElement {
  return (
    <>
      <Container header="CharlesStover.com">
        <Div element="p">
          This dashboard showcases operational and performance metrics for{' '}
          <Link href="/">CharlesStover.com</Link>.
        </Div>
        <Div>
          <div style={{ height: '92px', width: '92px' }}>
            <CircularProgressbarWithChildren
              styles={buildStyles({
                pathColor: 'green',
                rotation: 0.99,
                strokeLinecap: 'butt',
                trailColor: 'transparent',
              })}
              value={1}
            >
              <CircularProgressbarWithChildren
                styles={buildStyles({
                  pathColor: 'yellow',
                  rotation: 0.89,
                  strokeLinecap: 'butt',
                  trailColor: 'transparent',
                })}
                value={1}
              >
                <CircularProgressbarWithChildren
                  styles={buildStyles({
                    pathColor: 'red',
                    rotation: 0.49,
                    strokeLinecap: 'butt',
                    trailColor: 'transparent',
                  })}
                  value={1}
                >
                  <CircularProgressbarWithChildren
                    styles={buildStyles({
                      pathColor: 'yellow',
                      strokeLinecap: 'butt',
                      trailColor: 'transparent',
                    })}
                    value={60}
                  >
                    <CircularProgressbarWithChildren
                      styles={buildStyles({
                        pathColor: 'darkyellow',
                        rotation: 0.6,
                        strokeLinecap: 'butt',
                        trailColor: 'transparent',
                      })}
                      value={1}
                    >
                      60%
                    </CircularProgressbarWithChildren>
                  </CircularProgressbarWithChildren>
                </CircularProgressbarWithChildren>
              </CircularProgressbarWithChildren>
            </CircularProgressbarWithChildren>
          </div>
        </Div>
      </Container>
    </>
  );
}
