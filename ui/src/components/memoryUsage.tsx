import * as React from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { fetchDataThunkAction } from '../thunk-actions';
import { IMemoryUsage, IStore } from '../interfaces';

interface IMemoryUsageProps {
    memoryUsageData?: IMemoryUsage[];
}

interface IDispatchToProps {
    fetchData: typeof fetchDataThunkAction;
}

interface IState {
    startTime?: number;
    endTime?: number;
}

type IProps = IMemoryUsageProps & IDispatchToProps;

class MemoryUsageChart extends React.Component<IProps, IState> {
    public componentDidMount() {
        const startTime = -Infinity;
        const endTime = Infinity;
        this.props.fetchData(startTime, endTime);
    }

    public shouldComponentUpdate(newProps: IProps) {
        return !isEqual(newProps.memoryUsageData, this.props.memoryUsageData);
    }

    public render () {
      const memoryUsage = this.props.memoryUsageData ? this.props.memoryUsageData : [];

      return (<div>
          {
              memoryUsage.map(({ usage, timestamp }: IMemoryUsage, index: number) => (
                <div key={`${index}`}>
                    <div>{usage}</div>
                    <div>{timestamp}</div>
                </div>
              ))
          }
      </div>
      );
    }
}

const mapDispatchToProps: IDispatchToProps = {
    fetchData: fetchDataThunkAction,
}

const mapStateToProps = (state: IStore) => {
    return {
        memoryUsageData: state.data,
    };
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MemoryUsageChart);
