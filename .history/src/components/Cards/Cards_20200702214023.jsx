import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({ data :{confirmed, recovered, deaths, lastUpdate}}) => {

    if(!confirmed) {
        return 'Cargando contenido...';
    }

    return(
        <div className={styles.container}>
        <Grid container spacing={3} justify="center">
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infectados)}>
                <CardContent>
                    <Typography color="textSecondary"       gutterBottom>Casos Nuevos Totales</Typography>
                    <Typography variant="h5">
                        <CountUp  start={0} end={confirmed.value} duration={2.5} separator=","
                        />
                    </Typography>
                    <Typography         colr="TextSecondary">{new Date(lastUpdate).toLocaleDateString()}</Typography>
                    <Typography variant="body2">Número de Casos Nuevos Totales de COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recuperados)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Recuperados</Typography>
                    <Typography variant="h5">recovered.value
                    </Typography>
                    <Typography         colr="TextSecondary">{new Date(lastUpdate).toLocaleDateString()}</Typography>
                    <Typography variant="body2">Número de Casos Recuperados Totales de COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.muertes)}>
                <CardContent>
                    <Typography color="textSecondary"       gutterBottom>Muertes</Typography>
                    <Typography variant="h5">
                        <CountUp  start={0} end={deaths.value} duration={2.5} separator=","
                        />
                    </Typography>
                    <Typography         colr="TextSecondary">{new Date(lastUpdate).toLocaleDateString()}</Typography>
                    <Typography variant="body2">Número de muertes totales causadas por COVID-19</Typography>
                </CardContent>
            </Grid>
        </Grid>
        </div>
    )
}

export default Cards;