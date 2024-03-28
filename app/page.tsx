"use client";

import * as React from "react";
import { useRef } from "react";
import {
	Map,
	Source,
	Layer,
	MapRef,
	GeoJSONSource,
	MapEvent,
} from "react-map-gl";
import ControlPanel from "@/components/control-panel";
import {
	clusterLayer,
	clusterCountLayer,
	unclusteredPointLayer,
} from "@/components/layers";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface FeatureProperties {
	cluster_id: number;
}

export default function Home() {
	const mapRef = useRef<MapRef | any>(null);

	const onClick = (event: any) => {
		const feature = event.features[0];
		const clusterId = (feature.properties as FeatureProperties).cluster_id;

		const mapboxSource = mapRef.current.getSource(
			"earthquakes"
		) as unknown as GeoJSONSource as any;

		mapboxSource.getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
			if (err) {
				return;
			}

			mapRef.current.easeTo({
				center: feature.geometry.coordinates,
				zoom,
				duration: 500,
			});
		});
	};

	return (
		<div className="h-screen">
			<Map
				initialViewState={{
					zoom: 1,
				}}
				mapStyle="mapbox://styles/mapbox/dark-v8"
				mapboxAccessToken={MAPBOX_TOKEN}
				interactiveLayerIds={[clusterLayer.id as string]}
				onClick={onClick}
				ref={mapRef}
			>
				<Source
					id="earthquakes"
					type="geojson"
					data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
					cluster={true}
					clusterMaxZoom={14}
					clusterRadius={50}
				>
					<Layer {...clusterLayer} />
					<Layer {...clusterCountLayer} />
					<Layer {...unclusteredPointLayer} />
				</Source>
			</Map>
			<ControlPanel />
		</div>
	);
}
