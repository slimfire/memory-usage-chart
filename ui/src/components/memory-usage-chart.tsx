import * as React from 'react';
import { Tooltip } from '@material-ui/core'
import { XAxis, YAxis, AreaSeries, XYPlot, Hint } from 'react-vis';
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
                    tickTotal={3}
                    tickFormat={this.formatDateAndTime}
                />
                <YAxis
                    color="#3f51b5"
                    tickFormat={this.formatMemoryUsage}
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

    /**
     * Converts memory usage from bytes to GB
     * @param value memory usage in bytes
     */
    public formatMemoryUsage = (value: number) => {
        const gbValue = bytes.format(value, {unit: 'GB'});
        const indexOfGB = gbValue.indexOf('GB');
        if(indexOfGB === -1) {
            return gbValue;
        }

        return gbValue.substring(0, indexOfGB);
    }

    /**
     * Formats timestamp from milliseconds to `MM/DD, hh:mm a`
     * @param timestamp timestamp in milliseconds
     */
    public formatDateAndTime = (timestamp: number) => {
        return moment(timestamp).format('MM/DD, hh:mm a');
    }

    /**
     * updates X,Y coordinates of mouse in chart
     */
    public onNearestX = (xyPos: IXYCoordinate) => {
        this.setState({pos: xyPos})
    }

    /**
     * Resets x,y pos to 0,0 on mouse leave
     */
    public onMouseLeave = () => {
        this.setState({ pos: { x: 0, y: 0}});
    }

    /**
     * Formats data from {timestamp, usage} into {x, y} values
     * @param data list of memoryusage data
     */
    public formatData = (data: IMemoryUsage[]) => {
        return data.map(({ usage, timestamp }: IMemoryUsage) => ({
            x: parseInt(timestamp),
            y: parseInt(usage),
        }));
    }
}

export default MemoryUsageChart;