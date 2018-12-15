import * as React from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import bytes from 'bytes';
import { Grid, Paper, withStyles } from '@material-ui/core';

import { styles } from './styles';
import Chart from './memory-usage-chart';
import { fetchDataThunkAction, fetchOSSpecThunkAction } from '../thunk-actions';
import { IMemoryUsage, IStore, IOSSpec } from '../interfaces';

interface IMemoryUsageProps {
	OSSpec: IOSSpec;
	memoryUsageData: IMemoryUsage[];
	classes?: any;
}

interface IDispatchToProps {
	fetchData: typeof fetchDataThunkAction;
	fetchOSSpec: typeof fetchOSSpecThunkAction;
}

interface IState {
	startTime?: number;
	endTime?: number;
}

type IProps = IMemoryUsageProps & IDispatchToProps;

class MemoryUsageChart extends React.Component<IProps, IState> {
	public static defaultProps: any = {
		OSSpec: {
			memory: 0,
			speed: 0,
			model: '',
			arch: '',
			CPUs: 0,
		},
		memoryUsageData: [],
	}

	public componentDidMount() {
		const startTime = -Infinity;
		const endTime = Infinity;
		this.props.fetchData(startTime, endTime);
		this.props.fetchOSSpec();
	}

	public shouldComponentUpdate(newProps: IProps) {
		return !isEqual(newProps, this.props);
	}

	public render () {
		const { classes } = this.props;
		const { memory, speed, model, arch, CPUs } = this.props.OSSpec;

	  return (
		<Grid container spacing={24} >
			<Grid item xs={12}>
				<Paper className={`${classes.paper} ${classes.title}`}>OS Memory Usage</Paper >
			</Grid>
			<Grid item xs={3}>
				<Paper className={`${classes.paper} ${classes.spec} ${classes.specPaper}`} >
					<span className={`${classes.specItem} ${classes.title}`}>Specification</span>
					<hr />
					<span className={classes.specItem}><span className={classes.title}>Speed:</span> {speed}GHz</span>
					<span className={classes.specItem}><span className={classes.title}>Model:</span> {model}</span>
					<span className={classes.specItem}><span className={classes.title}>Memory:</span> {bytes.format(memory, { unit: 'GB' })}</span>
					<span className={classes.specItem}><span className={classes.title}>CPUs:</span> {CPUs}</span>
					<span className={classes.specItem}><span className={classes.title}>Architecture:</span> {arch}</span>
				</Paper>
			</Grid>
			<Grid item xs={9}>
				<Paper className={classes.paper} >
					<Chart data={this.props.memoryUsageData} />
				</Paper>
			</Grid>
		</Grid>
	  );
	}
}

const mapDispatchToProps: IDispatchToProps = {
	fetchData: fetchDataThunkAction,
	fetchOSSpec: fetchOSSpecThunkAction,
}

const mapStateToProps = (state: IStore) => {
	return {
		memoryUsageData: state.data,
		OSSpec: state.OSSpec,
	};
}


export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(
	withStyles(styles)(MemoryUsageChart),
);
