import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import Zoom from 'react-reveal/Zoom';
import numeralogo from './../../images/favicon.png';
import styles from './Cards.module.css';

const Cards = ({ data :{confirmed, recovered, deaths, lastUpdate, active}}) => {

    if(!confirmed) {
        return (
            <div className={styles.cargando}>
            <Zoom>
                <img className={styles.imagen} src={numeralogo} alt="Logo de Numeral.Lab" />
            </Zoom>
            </div>
        )
    };

const activos = (
active ? (
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.activos)}>
                    <CardContent>
                        <Typography className={styles.titulo} color="textSecondary"       gutterBottom>Casos Activos</Typography>
                        <Typography variant="h5">
                            <CountUp className={styles.cifra}  start={0} end={active.value} duration={2.5} separator=","
                         />
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toLocaleDateString()}</Typography>
                        <Typography variant="body2">Número de Casos Activos de COVID-19</Typography>
                    </CardContent>
                </Grid>
) : null

);


    return(
        <div className={styles.container}>
        <Grid container spacing={3} justify="center">
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infectados)}>
                <CardContent>
                    <Typography className={styles.titulo} color="textSecondary"       gutterBottom>Casos Totales</Typography>
                    <Typography variant="h5">
                        <CountUp className={styles.cifra}  start={0} end={confirmed.value} duration={2.5} separator=","
                        />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toLocaleDateString()}</Typography>
                    <Typography variant="body2">Número de Casos Totales de COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recuperados)}>
                <CardContent>
                    <Typography className={styles.titulo} color="textSecondary" gutterBottom>Recuperados</Typography>
                    <Typography variant="h5">
                        <CountUp className={styles.cifra}  start={0} end={recovered.value} duration={2.5} separator=","
                        />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toLocaleDateString()}</Typography>
                    <Typography variant="body2">Número de Casos Recuperados Totales de COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.muertes)}>
                <CardContent>
                    <Typography className={styles.titulo} color="textSecondary" gutterBottom>Muertes</Typography>
                    <Typography variant="h5">
                        <CountUp className={styles.cifra}  start={0} end={deaths.value} duration={2.5} separator=","
                        />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toLocaleDateString()}</Typography>
                    <Typography variant="body2">Número de muertes totales causadas por COVID-19</Typography>
                </CardContent>
            </Grid>
            {active ? activos : activos}
        </Grid>
        </div>
    )
}

export default Cards;