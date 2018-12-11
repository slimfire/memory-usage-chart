import axios, { AxiosError, AxiosResponse } from 'axios';
import * as React from 'react';

import { IMemoryUsage } from '../interfaces';

interface IState {
    error?: string;
    memoryUsageData?: IMemoryUsage[];
    startTime?: number;
    endTime?: number;
}

const BASE_URL = 'http://localhost:9000';

class MemoryUsageChart extends React.Component<any, IState> {
    constructor(props: any){
        super(props);

        this.state = {
            endTime: Infinity,
            error: '',
            memoryUsageData: [],
            startTime: -Infinity,
        };
    }
    public componentDidMount() {
        const { startTime, endTime } = this.state;
        axios.post(`${BASE_URL}/fetchMemoryUsage`, {
            startTime, endTime,
        })
        .then((data: AxiosResponse) => {
            this.setState({ memoryUsageData: data.data ? data.data : [{usage: 20, timestamp: 123}] });
        })
        .catch(({ response }: AxiosError) => {
            this.setState({error: response ? response.toString() : 'Error fetching data.'});
        })
    }

    public render () {
      const memoryUsage = this.state.memoryUsageData ? this.state.memoryUsageData : [];

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

export default MemoryUsageChart;
