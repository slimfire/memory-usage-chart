import axios, { AxiosError, AxiosResponse } from 'axios';
import * as React from 'react';

interface IMemoryUsage {
    usage: string;
    timestamp: string;
}

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
        axios.post(`${BASE_URL}/fetchMemoryUsage`, {
            start: 1544074441873,
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
      const rows = memoryUsage.map(({ usage, timestamp }: any) => (
        <div>
            <div>{usage}</div>
            <div>{timestamp}</div>
        </div>
      ));

      return <div>{...rows}</div>;
    }
}

export default MemoryUsageChart;
