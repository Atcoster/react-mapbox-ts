import React, { useState, useRef, useEffect } from 'react';
import { FeatureCollection, Properties, randomPoint, BBox, Point, pointsWithinPolygon, Feature } from '@turf/turf';
import { LngLatBounds } from 'mapbox-gl';
import { v4 as uuidv4 } from 'uuid';
import MapGL, { FullscreenControl, Marker, Viewport } from '@urbica/react-map-gl';
import Cluster, { ClusterComponentProps } from '@urbica/react-map-gl-cluster';
import Draw from '@urbica/react-map-gl-draw';
import { Project, projects } from '@/assets/projects';
import { useHover } from '@/hooks/useHover';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { randomNumber } from '@/helpers/randomNumber';
import { clusterStyle, markerStyle } from './mapStyling';
import 'mapbox-gl/dist/mapbox-gl.css';

const currentMapLayerStyle = 'mapbox://styles/mapbox/light-v9';

const projectsWithPoints = projects.map((project) => {
	const cpts = randomPoint(randomNumber(10, 20), { bbox: project.bbox as BBox });
	cpts.features.forEach((point) => (point.id = uuidv4()));

	return {
		...project,
		cpts,
	};
});

const Mapbox = () => {
	// const [hovered, eventHandlers] = useHover();
	const mapRef = useRef<MapGL>(null);
	const [drawedPolygons, setDrawedPolygons] = useState<Record<string, FeatureCollection>>({});
	const [selectedProject, setSelectedProject] = useState<Project>();
	const [selectedCpts, setSelectedCpts] = useState<(string | number | undefined)[]>();
	const [viewport, setViewport] = useState<Viewport>({
		latitude: 52.21158,
		longitude: 5.600489,
		zoom: 7,
	});

	useEffect(() => {
		if (selectedProject?.cpts && drawedPolygons) {
			const ptsWithin = Object.values(drawedPolygons)
				.map((polygon) => {
					return polygon.features.map((f) => {
						// @ts-ignore
						return pointsWithinPolygon(selectedProject.cpts, f).features.map((f) => {
							return f.id;
						});
					});
				})
				.flat(2);

			if (ptsWithin) setSelectedCpts(ptsWithin);
		}
	}, [drawedPolygons, selectedProject]);

	const updatePolygons = (data: FeatureCollection) => {
		const id = data.features[0].id;
		setDrawedPolygons((current) => {
			return {
				...current,
				[`${id}`]: { ...data },
			};
		});
	};

	const deletePolygon = (data: FeatureCollection) => {
		const id = data.features[0].id;
		const cloned = { ...drawedPolygons };

		if (id) {
			delete cloned[id];
			setDrawedPolygons(cloned);
		}
	};

	const handleMarkerOnClick = (cpt: Feature<Point, Properties>) => {
		console.log(cpt.id);
	};

	const ClusterMarker = (
		{ longitude, latitude, pointCount }: ClusterComponentProps,
		id: number,
		cpts: FeatureCollection<Point, Properties> | null
	) => {
		const customClusterStyle = {
			...clusterStyle,
			backgroundColor: id === selectedProject?.id ? 'rgba(100, 75, 255, 0.8)' : 'rgba(169, 157, 255, 0.7)',
		};

		return (
			<Marker
				longitude={longitude}
				latitude={latitude}
				anchor="center"
				onClick={() => {
					const bounds = new LngLatBounds();
					cpts?.features.forEach((feature) => {
						const coords = feature.geometry?.coordinates;
						if (coords) {
							bounds.extend([coords[0], coords[1]]);
						}
					});
					mapRef?.current?.getMap().fitBounds(bounds, {
						padding: {
							top: 70,
							bottom: 70,
							left: 70,
							right: 70,
						},
					});
					const selectedProject = projectsWithPoints.find((p) => p.id === id);
					setSelectedProject(selectedProject);
				}}
			>
				<div style={{ ...customClusterStyle }}>{pointCount}</div>
			</Marker>
		);
	};

	return (
		<MapGL
			{...viewport}
			ref={mapRef}
			// onLoad={() => setIsLoaded(true)}
			mapStyle={currentMapLayerStyle}
			accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
			style={{ width: '100vw', height: '100vh' }}
			onViewportChange={setViewport}
			dragRotate={false}
		>
			{projectsWithPoints.map((project, index) => {
				return (
					<Cluster
						key={`${project.id}`}
						extent={10}
						nodeSize={64}
						component={(props: ClusterComponentProps) => ClusterMarker(props, project.id, project.cpts)}
					>
						{project.cpts.features.map((cpt) => {
							const coords = cpt?.geometry?.coordinates;
							if (!coords) return null;
							const selected = selectedCpts?.some((id) => id?.toString() === cpt.id?.toString());
							return (
								<Marker
									key={`${cpt.id}_${selected}`} // Key need to change everytime you want it to be updated
									longitude={coords[0]}
									latitude={coords[1]}
									anchor="center"
									onClick={() => handleMarkerOnClick(cpt)}
								>
									<div
										style={{
											...markerStyle,
											backgroundColor: selected ? '#00f' : '#f00',
										}}
									/>
								</Marker>
							);
						})}
					</Cluster>
				);
			})}
			<Draw
				keybindings={true}
				lineStringControl={false}
				pointControl={false}
				combineFeaturesControl={false}
				uncombineFeaturesControl={false}
				onDrawCreate={updatePolygons}
				onDrawUpdate={updatePolygons}
				onDrawDelete={deletePolygon}
			/>
			<FullscreenControl position="top-right" />
		</MapGL>
	);
};

export default Mapbox;
