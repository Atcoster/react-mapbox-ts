import { InteractionEvent } from '@urbica/react-map-gl';
import { useMemo, useState } from 'react';

export const useHover = () => {
	const [hoveredId, setHoveredId] = useState<string | null>();

	const eventHandlers = useMemo(
		() => ({
			onMouseOver(event: InteractionEvent) {
				console.log(event);

				if (event.features) {
					const feature = event?.features[0];
					const nextHoveredStateId = feature.id;
					setHoveredId((currentHoveredId) =>
						currentHoveredId !== nextHoveredStateId ? nextHoveredStateId : currentHoveredId
					);
				}
			},
			onMouseOut() {
				setHoveredId(null);
			},
		}),
		[]
	);

	return [hoveredId, eventHandlers];
};
