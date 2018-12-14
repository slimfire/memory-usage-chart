import * as React from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { Grid, Paper, withStyles } from '@material-ui/core';

import { fetchDataThunkAction } from '../thunk-actions';
import { IMemoryUsage, IStore } from '../interfaces';

interface IMemoryUsageProps {
	memoryUsageData?: IMemoryUsage[];
	classes?: any;
}

interface IDispatchToProps {
	fetchData: typeof fetchDataThunkAction;
}

interface IState {
	startTime?: number;
	endTime?: number;
}

type IProps = IMemoryUsageProps & IDispatchToProps;

const styles = (style: any) => {
	return  {
		root: {
			'background-color': style.palette.background.default,
		},
		paper: {
			'text-align': 'center',
			padding: style.spacing.unit * 2,
			color: style.palette.primary.main
		},
		specs: {
			'text-align': 'left',
		}
	};
}

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
		const { classes } = this.props;

	  return (
		<Grid container spacing={24} >
			<Grid item xs={12}>
				<Paper className={classes.paper}>Memory Usage Chart</Paper >
			</Grid>
			<Grid item xs={3} className={classes.specs}>
				<Paper className={classes.paper} >
					Specs
				</Paper>
			</Grid>
			<Grid item xs={9}>
				<Paper className={classes.paper} >
					Chart
				</Paper>
			</Grid>
		</Grid>
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


export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(
	withStyles(styles)(MemoryUsageChart),
);
