import { InteractionEvent } from '@urbica/react-map-gl';
import { useMemo, useState } from 'react';

export const useHover = () => {
	const [hoveredId, setHoveredId] = useState<string | null>();

	const eventHandlers = useMemo(
		() => ({
			onHover(event: InteractionEvent) {
				// if (event?.features?.length > 0) {
				// 	const nextHoveredStateId = event.features[0].id;
				// 	setHoveredId((currentHoveredId) =>
				// 		currentHoveredId !== nextHoveredStateId ? nextHoveredStateId : currentHoveredId
				// 	);
				// }
			},
			onLeave() {
				setHoveredId(null);
			},
		}),
		[]
	);

	return [hoveredId, eventHandlers];
};
