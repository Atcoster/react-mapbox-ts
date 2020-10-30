const baseStyle = {
	color: '#fff',
	borderRadius: '50%',
	cursor: 'pointer',
};

export const clusterStyle = {
	...baseStyle,
	width: '20px',
	height: '20px',
	border: 'solid 2px rgba(169, 157, 255, 0.4)',
	backgroundColor: 'rgba(169, 157, 255, 0.7)',
	textAlign: 'center' as 'center',
};

export const markerStyle = {
	...baseStyle,
	width: '10px',
	height: '10px',
	backgroundColor: '#f00',
};
