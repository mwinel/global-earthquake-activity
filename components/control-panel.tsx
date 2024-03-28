"use client";

import * as React from "react";

function ControlPanel() {
	return (
		<div className="absolute top-0 right-0 max-w-xs bg-white shadow-md p-4 mx-4 mt-4 text-sm leading-6 text-gray-800 space-y-2">
			<h3 className="font-medium underline underline-offset-4">
				Global Earthquake Activity
			</h3>
			<p className="text-xs">
				Seismic activity density grouped together based on their proximity.
			</p>
			<div className="text-xs space-y-1">
				<div className="flex items-center gap-2">
					<div className="h-3 w-3 bg-[#f28cb1]" />
					<p>1k +</p>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-3 w-3 bg-[#f1f075]" />
					<p>100 - 1k</p>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-3 w-3 bg-[#51bbd6]" />
					<p>0 - 100</p>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-3 w-3 bg-red-600" />
					<p>Unclustered/Individual</p>
				</div>
			</div>
		</div>
	);
}

export default React.memo(ControlPanel);
