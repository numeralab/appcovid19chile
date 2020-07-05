import React, { useState, useEffect} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const CountryPicker = ({
        handleCountryChange
    }) => {

    const [confirmed, setFetchedCountries] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();

    }, [setFetchedCountries]);

    console.log(confirmed);
    return ( 
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue = ""
            onChange = {
                (e) => {
                     handleCountryChange(e.target.value)
                }
            } >
{/* Lo siguiente es para el selector de países */}
                <option value="Chile">Chile</option>
                {confirmed.map((confirmed, i) => <option key={i} value={confirmed.provinceState}>{confirmed.provinceState}</option>)}
            </NativeSelect>

        </FormControl>
    )
}
export default CountryPicker;