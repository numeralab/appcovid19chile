import React from 'react';

// import Cards from './components/Cards/Cards.jsx';
// import Chart from './components/Chart/Chart.jsx';
// import CountryPicker from './components/CountryPicker/CountryPicker.jsx';

import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData} from './api';
// Acá se agrega el componente
class App extends React.Component {
    state = {
        data: {},
        provinceState: '',
    }
    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData })
    }

    handleCountryChange = async (provinceState) => {
        const fetchedData = await fetchData(provinceState);
        this.setState({ data: fetchedData, provinceState: provinceState })
    }


    render() {
        const { data, provinceState} = this.state;


        return (
            <div className={styles.container}>
                <Cards data={data} />
                <CountryPicker handleCountryChange = {
                    this.handleCountryChange
                }
                />
                <Chart data={data} provinceState={provinceState} />
            </div>
        )
    }
}

export default App;