"use client"
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const PieChartComponent = (props) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    useEffect(() => {
        const dataPie = {
            labels: ["Wrong answer", "Correct answer"],
            datasets: [
                {
                    label: "Quiz result",
                    data: [props.wrong, props.correct],
                    backgroundColor: [
                        "rgb(133, 105, 241)",
                        "rgb(164, 101, 241)",
                    ],
                    hoverOffset: 4,
                },
            ],
        };

        const configPie = {
            type: "pie",
            data: dataPie,
            options: {},
        };
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(canvasRef.current, configPie);

        return () => {
            chartRef.current.destroy();
        };
    });

    return (
        <div className=" size-72">
            <canvas ref={canvasRef} id="chartPie"></canvas>
        </div>
    );
};

export default PieChartComponent;
