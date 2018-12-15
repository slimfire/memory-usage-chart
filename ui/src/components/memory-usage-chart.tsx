import * as React from 'react';
import { Tooltip } from '@material-ui/core'
import { XAxis, YAxis, AreaSeries, XYPlot, Hint, ChartLabel } from 'react-vis';
import bytes from 'bytes';
import moment from 'moment';

import { IMemoryUsage } from '../interfaces';

interface IMemoryUsageChartProps {
    data: IMemoryUsage[];
}

interface IMemoryUsageState {
    pos: IXYCoordinate;
}

interface IXYCoordinate {
    x: number;
    y: number;
}


class MemoryUsageChart extends React.Component <IMemoryUsageChartProps, IMemoryUsageState>{
    constructor(props: IMemoryUsageChartProps) {
        super(props);

        this.state = {
            pos: {
                x: 0,
                y: 0,
            }
        };
    }

    public onMouseLeave = () => {
        this.setState({ pos: { x: 0, y: 0}});
    }

    public render(){
        const data = this.formatData(this.props.data);
        const { pos } = this.state;

        return (
            <XYPlot
                onMouseLeave={this.onMouseLeave}
                width={1000}
                height={500}
                margin={{left: 50, bottom: 50}}
            >
                <Hint value={pos}>
                    <Tooltip title="">
                        <div>
                            <span>{this.formatDateAndTime(pos.x)}</span>
                            <br />
                            <span>{this.formatMemoryUsage(pos.y)}GB</span>
                        </div>
                    </Tooltip>
                </Hint>
                <XAxis
                    color="#3f51b5"
                    title="Time"
                    tickTotal={3}
                    tickFormat={this.formatDateAndTime}
                />
                <YAxis
                    color="#3f51b5"
                    title="Memory Usage (GB)"
                    tickFormat={this.formatMemoryUsage}
                />
                <ChartLabel
                    text="Memory Usage (GB)"
                    includeMargin={false}
                    xPercent={0}
                    yPercent={0}
                    className="alt-x-label"
                />
                <AreaSeries
                    data={data}
                    curve="curveMonotoneX"
                    color="#3f51b5"
                    fill="#3f51b5"
                    onNearestXY={this.onNearestX}
                />
            </XYPlot>
        );
    }

    public formatMemoryUsage = (value: number) => {
        const gbValue = bytes.format(value, {unit: 'GB'});
        const indexOfGB = gbValue.indexOf('GB');
        if(indexOfGB === -1) {
            return gbValue;
        }

        return gbValue.substring(0, indexOfGB);
    }

    public formatDateAndTime = (timestamp: number) => {
        return moment(timestamp).format('MMM DD, YY hh:mm a');
    }

    public onNearestX = (xyPos: IXYCoordinate) => {
        this.setState({pos: xyPos})
    }

    public formatData = (data: IMemoryUsage[]) => {
        return data.map(({ usage, timestamp }: IMemoryUsage) => ({
            x: parseInt(timestamp),
            y: parseInt(usage),
        }));
    }
}

export default MemoryUsageChart;