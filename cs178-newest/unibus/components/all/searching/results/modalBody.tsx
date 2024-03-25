import React, { useState, useEffect } from 'react';
import AlertButton from '../alertButton';

export default function ModalBody(props: { eta: string }) {
    const [countdown, setCountdown] = useState<{minutes: number, seconds: number}>({minutes: 0, seconds: 0});

    useEffect(() => {
        if (props.eta) {
            const now = new Date();
            const etaDate = new Date(`${now.toDateString()} ${props.eta}`).getTime();
        
            if (!isNaN(etaDate)) {
                const diff = Math.floor((etaDate - now.getTime()) / 1000);
                setCountdown({minutes: Math.floor(diff / 60), seconds: diff % 60});
        
                const interval = setInterval(() => {
                    setCountdown(prevCountdown => {
                        const totalSeconds = prevCountdown.minutes * 60 + prevCountdown.seconds - 1;
                        return {minutes: Math.floor(totalSeconds / 60), seconds: totalSeconds % 60};
                    });
                }, 1000);
        
                return () => clearInterval(interval);
            } else {
                console.error('Invalid ETA date:', props.eta);
            }
        }
    }, [props.eta]); 

    return (
        <div className="max-w-sm mx-auto text-center">
            <div className="mb-6">
                <h1 className="text-lg font-semibold">Your Ride</h1>
            </div>
            <div className="flex justify-center items-center mb-4">
                <div className={`px-4 py-2 border border-gray-300 rounded-lg ${(countdown.minutes > 0 || countdown.seconds > 0) ? 'bg-gray-200 text-black font-bold' : ''}`}>
                    {(countdown.minutes > 0 || countdown.seconds > 0) ? `Countdown: ${countdown.minutes} minutes and ${countdown.seconds} seconds` : <AlertButton />}
                </div>
            </div>
        </div>
    );
}
