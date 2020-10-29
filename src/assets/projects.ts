import { Properties, Position, FeatureCollection, Point } from '@turf/turf';

export interface Project {
	name: string;
	id: number;
	bbox: Position;
	cpts: FeatureCollection<Point, Properties> | null;
}

export const projects: Project[] = [
	{
		name: 'Blijdorp',
		id: 1,
		bbox: [4.44766, 51.924949, 4.449012, 51.927225],
		cpts: null,
	},
	{
		name: 'Essenburgsingel',
		id: 2,
		bbox: [4.449248, 51.921535, 4.451512, 51.921859],
		cpts: null,
	},
	{
		name: 'Sportcomplex',
		id: 3,
		bbox: [4.454634, 51.92393, 4.461651, 51.925412],
		cpts: null,
	},
	{
		name: 'Gaalenlaan',
		id: 4,
		bbox: [4.349127, 52.011091, 4.352496, 52.012016],
		cpts: null,
	},
	{
		name: 'Exodus',
		id: 5,
		bbox: [4.336885, 52.007661, 4.341091, 52.00803],
		cpts: null,
	},
	{
		name: 'meishi',
		id: 6,
		bbox: [5.114533, 52.093344, 5.116475, 52.095084],
		cpts: null,
	},
	{
		name: 'Copacabajes',
		id: 7,
		bbox: [5.12465, 52.096422, 5.126179, 52.097463],
		cpts: null,
	},
];
