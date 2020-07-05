import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../../api';
import styles from './Chart.module.css';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import Zoom from 'react-reveal/Zoom';


const Chart = ({data : {confirmed, recovered, deaths} , provincia}) => {
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
provincia ? (
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

return (
    <div className={styles.container}>
    {provincia ? barChart : barChart}
    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infectados)}>
        <CardContent>
            <Typography className={styles.titulo} color="textSecondary"       gutterBottom>Casos Activos</Typography>
            <Typography variant="h5">
                <CountUp className={styles.cifra}  start={0} end={activos.value} duration={2.5} separator=","
                />
                    </Typography>
            <Typography variant="body2">Número de Casos Activos de COVID-19</Typography>
        </CardContent>
    </Grid>
    </div>
);
}

export default Chart;