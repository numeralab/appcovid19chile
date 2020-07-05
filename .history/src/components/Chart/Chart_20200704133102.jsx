import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../../api';
import styles from './Chart.module.css';

const Chart = ({data : {confirmed, recovered, deaths, active} , provincia}) => {
    const [dailyData, setDailyData] = useState({});
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);


    const inicial = (
        confirmed ? (
    <Bar
        data={{
            labels: ['Casos Totales', 'Recuperados Totales', 'Muertes'],
            datasets: [ {
                label: 'Total de personas',
                backgroundColor: ['rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255, 0, 0, 0.5)'],
            data:[confirmed.value, recovered.value, deaths.value],
            },
            ],
        }}

        options={{
            legends: {display:false}, 
            title: { display:true, text:`Estado actualizado en la región de ${provincia}`}
        }}
     />

) : null

    ); 


const barChart = (
provincia ? (
    <Bar
        data={{
            labels: ['Casos Totales', 'Recuperados Totales', 'Muertes', 'Activos'],
            datasets: [ {
                label: 'Total de personas',
                backgroundColor: ['rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255, 0, 0, 0.5)'],
            data:[confirmed.value, recovered.value, deaths.value, active.value],
            },
            ],
        }}

        options={{
            legends: {display:false}, 
            title: { display:true, text:`Estado actualizado en la región de ${provincia}`}
        }}
     />

) : null

);

return (
    <div className={styles.container}>
        {provincia ? barChart : barChart}
    </div>
);
}

export default Chart;