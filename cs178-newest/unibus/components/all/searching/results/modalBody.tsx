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
            <div className="space-y-4">
                {stops.map((stop, index) => (
                    <div className="flex items-center" key={index}>
                        <div className={`flex flex-col items-center mr-4 ${index !== 0 ? 'mt-6' : ''}`}>
                            {/* Conditional rendering for before pseudo-element */}
                            {index !== 0 && (
                                <div className="w-px h-6 bg-black before:absolute before:top-0 before:left-1/2 before:-mt-6 before:w-px before:h-6 before:bg-black"></div>
                            )}
                            <div className="w-3 h-3 bg-black rounded-full relative z-10"></div>
                            {/* Conditional rendering for after pseudo-element */}
                            {index !== stops.length - 1 && (
                                <div className="w-px h-6 bg-black after:absolute after:bottom-0 after:left-1/2 after:mb-6 after:w-px after:h-6 after:bg-black"></div>
                            )}
                        </div>
                        <div className="flex justify-between w-full">
                            <div>
                                <div className="font-bold">{stop.name}</div>
                                <div className="text-sm text-gray-500">{index === 0 ? 'Next up' : ''}</div>
                            </div>
                            <div className="font-bold">{stop.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

