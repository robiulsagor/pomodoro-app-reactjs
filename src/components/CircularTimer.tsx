import type { Dispatch, SetStateAction } from "react";

export function CircularTimer({ timeLeft, totalTime, running, type, showForm }:
    { timeLeft: number; totalTime: number, running: boolean, type: string, showForm: Dispatch<SetStateAction<boolean>> }) {
    const radius = 90;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 0.5;
    const circumference = 2 * Math.PI * normalizedRadius;

    const progress = timeLeft / totalTime;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <svg height={radius * 2} width={radius * 2}>
            {/* Background circle */}
            <circle
                stroke="#2e2e2e"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            {/* Progress circle */}
            <circle
                stroke="#00ff88"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
            {/* Timer text */}
            <text
                fill='white'
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize={running ? 18 : 14}
                fontWeight="bold"
                x="50%"
                transform={`translate(0, ${running ? 60 : 40})`}
                opacity={running ? .8 : .2}
                style={{ transition: 'all .2s linear' }}
            >
                {type}
            </text>

            <text
                x="50%"
                transform={`translate(0, ${running ? 105 : 90})`}
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontWeight="bold"
                opacity={running ? 1 : .7}
                style={{ transition: 'all .2s linear', letterSpacing: '3px' }}
                onClick={() => showForm(true)}
                className="cursor-pointer text-3xl"
            >
                {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                {String(timeLeft % 60).padStart(2, '0')}
            </text>
        </svg>
    );
}
