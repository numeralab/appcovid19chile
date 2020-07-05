import React from 'react';

// import Cards from './components/Cards/Cards.jsx';
// import Chart from './components/Chart/Chart.jsx';
// import CountryPicker from './components/CountryPicker/CountryPicker.jsx';

import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData} from './api';

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
                <h1 className={styles.titulo}>Seguimiento COVID-19 Chile</h1>
                <img className={styles.imagen} src={numeralogo} alt="Logo de Numeral.Lab" />
                <Cards data={data} />
                <CountryPicker handleCountryChange = {
                    this.handleCountryChange
                }
                />
                <Chart data={data} provincia={provincia} />
            </div>
        )
    }
}

export default App;