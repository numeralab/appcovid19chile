import React from 'react';

// import Cards from './components/Cards/Cards.jsx';
// import Chart from './components/Chart/Chart.jsx';
// import CountryPicker from './components/CountryPicker/CountryPicker.jsx';

import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData} from './api';
import Zoom from 'react-reveal/Zoom';
import { AnimationWrapper } from 'react-hover-animation';
import ScrollAnimation from 'react-animate-on-scroll';
import numeralogo from './images/favicon.png';
import "animate.css/animate.min.css";
// Acá se agrega el componente
class App extends React.Component {
    state = {
        data: {},
        provincia: '',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData })
    }

    handleCountryChange = async (provincia) => {
        const fetchedData = await fetchData(provincia);
        console.log(fetchedData)
        this.setState({ data: fetchedData, provincia: provincia })
    }


    render() {
        const { data, provincia} = this.state;


        return (
            <div className={styles.container}>
            <Zoom>
                <AnimationWrapper>
                <p className={styles.menu}><a href="adinamarca.github.io" className={styles.enlacefuente}>Volver a numeral.lab</a></p>
                </AnimationWrapper>
                <img className={styles.imagen} src={numeralogo} alt="Logo de Numeral.Lab" />
                <h1 className={styles.titulo}>Seguimiento COVID-19</h1>
                <h3 className={styles.chile}>Chile</h3>
                <h4 className={styles.fuente}>Las cifras a continuación son de <a className={styles.enlacefuente} href="https://covid19.mathdro.id/">fuente internacional</a>. Las regiones están ordenadas por número de casos totales.</h4>
                
                <Cards data={data} />
            </Zoom>
                <CountryPicker className={styles.selector} handleCountryChange = {
                    this.handleCountryChange
                }
                />
                <Chart data={data} provincia={provincia} />
                <ScrollAnimation animateIn='fadeIn' animateOut='fadeOut'>
                    <h5 className={styles.titulo}>Créditos y contacto</h5>
                    <p className={styles.fuente}>La aplicación fue desarrollada en un principio por <a className={styles.enlacefuente} href="youtube.com/javascriptmastery">JavaScript Mastery</a> y se sustenta en las fuentes de <a className={styles.enlacefuente} href="https://covid19.mathdro.id/"> la API de COVID19 de MathDro</a>. Posteriormente fue modificada por <a className={styles.enlacefuente} href="linkedin.com/alejandrodinamarca">Alejandro Dinamarca</a> para Chile y regiones específicas del país tras un tiempo de 18 hrs. aprox. </p>
                </ScrollAnimation>
            </div>
        )
    }
}

export default App;