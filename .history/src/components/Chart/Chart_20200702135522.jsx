import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../../api';
import styles from './Chart.module.css';

const Chart = ({data : {confirmed, recovered, deaths} , 'Chile'}) => {
    const [dailyData, setDailyData] = useState({});
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);


    const lineChart = (
        dailyData.length ? (
        <Line 
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({
                        confirmed
                    }) => confirmed),
                    label: 'Casos Nuevos Totales',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({
                    deaths
                    }) => deaths),
                    label: 'Muertes',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true,
                }],
            }}

        />) : null

    ); 


const barChart = (
confirmed ? (
    <Bar
        data={{
            labels: ['Casos Nuevos Totales', 'Recuperados Totales', 'Muertes'],
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
            title: { display:true, text:`Estado actualizado en la región ${country}`}
        }}
     />

) : null

);

return (
    <div className={styles.container}>
        {country ? barChart : lineChart}
    </div>
);
}

export default Chart;