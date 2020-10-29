import React from 'react';

declare module '@urbica/react-map-gl-cluster' {
	export type SuperclusterFeature = {
		type: 'Feature';
		id: number;
		properties: {
			cluster: true;
			cluster_id: number;
			point_count: number;
			point_count_abbreviated: string | number;
		};
		geometry: {
			type: 'Point';
			coordinates: [number, number];
		};
	};

	export type ClusterComponentProps = {
		longitude: number;
		latitude: number;
		clusterId: number;
		pointCount: number;
		pointCountAbbreviated: string | number;
	};

	export type ClusterMapFunction = (props: {}) => any;
	export type ClusterReduceFunction = (accumulated: {}, props: {}) => void;
	export type ClusterComponent = React.Component<ClusterComponentProps, any>;

	type Props = {
		/** Minimum zoom level at which clusters are generated */
		minZoom?: number;

		/** Maximum zoom level at which clusters are generated */
		maxZoom?: number;

		/** Cluster radius, in pixels */
		radius?: number;

		/** (Tiles) Tile extent. Radius is calculated relative to this value */
		extent?: number;

		/** Size of the KD-tree leaf node. Affects performance */
		nodeSize?: number;

		/**
		 * A function that returns cluster properties
		 * corresponding to a single point.
		 *  */
		// eslint-disable-next-line react/no-unused-prop-types
		map?: ClusterMapFunction;

		/** A reduce function that merges properties of two clusters into one. */
		// eslint-disable-next-line react/no-unused-prop-types
		reduce?: ClusterReduceFunction;

		/** React Component for rendering Cluster */
		component: Class<ClusterComponent>;

		/** List of Markers */
		children: React$Node;
	};

	type State = {
		clusters: Array<Object>;
	};

	export default class Cluster extends React.Component<Props, State> {
		/** The mouseenter event handler */
		onMouseenter?: Function;

		/** The mouseleave event handler */
		onMouseleave?: Function;
	}
}
