export default function ModalBody() {
    const stops = [
        { name: 'Stop 1', time: '5 mins' },
        { name: 'Stop 2', time: '10 mins' },
        { name: 'Stop 3', time: '15 mins' },
        { name: 'Stop 4', time: '20 mins' },
    ];

    return (
        <div className="max-w-sm mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-lg font-semibold">Your Ride</h1>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">Bus name</span>
                </div>
                <div className="px-4 py-2 bg-gray-200 rounded-full">
                    <span className="text-sm">ETA: 15 minutes</span>
                </div>
            </div>
            <div className="space-y-4 pt-2">
                {/* Line behind the items */}
                {/* TODO: Figure out how to get the line to render properly */}
                {/* <div className="absolute left-5 top-0 w-px bg-black" style={{ height: `calc(40% - 1rem)` }}></div> */}
                {stops.map((stop, index) => (
                    <div className="flex items-center" key={index}>
                        {/* Ensure the line extends fully from the first to the last item */}
                        <div className={`flex flex-col items-center mr-4`}>
                            <div className="w-3 h-3 bg-black rounded-full relative z-10"></div>
                        </div>
                        <div className="flex-1 flex justify-between">
                            <div className="font-bold">{stop.name}</div>
                            <div className="font-bold">{stop.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
