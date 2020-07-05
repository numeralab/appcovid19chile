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
    < Bar
    data = {
        {
            labels: ['Casos Totales', 'Recuperados Totales','Muertes'],
            datasets: [{
                label: 'Total de personas',
                backgroundColor: ['rgba(31, 97, 179,0.5)',
                    'rgba(0, 255, 0, 0.5)',
                    'rgba(255, 30, 0, 0.5)',

                ],
                data: [confirmed.value, recovered.value, deaths.value],
            }, ],
        }
    }

    options = {
    {
    legends: {
        display: false
    },
    title: {
        display: true,
        text: `Estado actualizado en todo Chile`
    }
    }
    }
    />

    ): null

    );


const barChart = (
provincia ? (
    <Bar
        data={{
            labels: ['Casos Totales', 'Recuperados Totales','Activos', 'Muertes'],
            datasets: [ {
                label: 'Total de personas',
                backgroundColor: ['rgba(31, 97, 179,0.5)',
                    'rgba(0, 255, 0, 0.5)',
                    'rgba(242, 128, 6, 0.5)',
                    'rgba(255, 30, 0, 0.5)',
                    
                ],
            data: [confirmed.value, recovered.value, active.value, deaths.value],
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
        {provincia ? barChart : inicial}
    </div>
);
}

export default Chart;