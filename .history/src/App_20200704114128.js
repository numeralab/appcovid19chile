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
                <h1 className={styles.titulo}>Seguimiento COVID-19 Chile</h1>
                <h4 className={styles.fuente}>Todas las cifras son de <a className={styles.enlacefuente} href="https://covid19.mathdro.id/">fuente internacional</a>.</h4>
            
                <img className={styles.imagen} src={numeralogo} alt="Logo de Numeral.Lab" />
                <Cards data={data} />
            
                <CountryPicker handleCountryChange = {
                    this.handleCountryChange
                }
                />
            </Zoom>
                <Chart data={data} provincia={provincia} />
            </div>
        )
    }
}

export default App;