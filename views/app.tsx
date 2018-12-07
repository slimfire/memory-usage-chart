import React, { Component } from 'react';

interface IMemoryUsage {
    usage: string;
    timestamp: string;
}

interface IState {
    memoryUsageData?: IMemoryUsage[];
}

class MemoryUsageChart extends Component<null, IState> {
    constructor(props){
        super(props);

        this.state = {
            memoryUsageData: [],
        };
    }
    public componentDidMount() {
        fetch('/fetchMemoryUsage')
        .then(response => response.json())
        .then((data: IMemoryUsage[]) => {
            console.log({ data });
            this.setState({ memoryUsageData: data });
        }, (err: Error) => {
            console.log('error fetching data ');
        });
    }

    public render () {
        const rows = this.state.memoryUsageData.map(({ usage, timestamp }) => {
            <div>
                <div>{usage}</div>
                <div>{timestamp}</div>
            </div>
        });

        return <div>{...rows}</div>;
    }
}

export default MemoryUsageChart;