import React from 'react';

// import Cards from './components/Cards/Cards.jsx';
// import Chart from './components/Chart/Chart.jsx';
// import CountryPicker from './components/CountryPicker/CountryPicker.jsx';

import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData} from './api';
import Zoom from 'react-reveal/Zoom';

import numeralogo from './images/favicon.png';
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
                <p className={styles.menu} href="adinamarca.github.io">Volver a numeral.lab</p>
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
                <h5>Créditos y contacto</h5>
            </div>
        )
    }
}

export default App;