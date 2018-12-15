export const styles = (style: any) => {
	return  {
		root: {
			'background-color': style.palette.background.default,
		},
		paper: {
			'text-align': 'center',
			padding: style.spacing.unit * 2,
			color: style.palette.primary.main
		},
		spec: {
			'text-align': 'left',
		},
		specItem: {
			display: 'block',
			padding: '10px',
        },
        specPaper: {
            height: '500px',
        },
        title: {
            'font-weight': 'bold',
        }
	};
};