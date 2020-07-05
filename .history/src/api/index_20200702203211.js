import axios from 'axios';
import Cards from '../components/Cards/Cards.jsx';
const url = 'https://covid19.mathdro.id/api/countries/CHILE';
export const fetchData = async (provincia) => {
    let changeableUrl = url;

    if (provincia) {
        changeableUrl = `${url}/confirmed`;
        let correcto = provincia;
        try {
            const {data: provincias } = await axios.get(`${url}/confirmed`);
            console.log(provincias[1].confirmed);
            let confirmados = provincias[1].confirmed;
            let recuperados = provincias[1].recovered;
            let muertes = provincias[1].deaths;
            let act = provincias[1].lastUpdate;
            Cards({ data :{confirmados, recuperados, muertes, act}});
        } catch (error) {
            return error;
        }
    } else {
        try {
            const {
                data: {
                    confirmed,
                    recovered,
                    deaths,
                    lastUpdate
                }
            } = await axios.get(changeableUrl);

            return {
                confirmed,
                recovered,
                deaths,
                lastUpdate
            };
        } catch (error) {
            return error;
        }
    }
};

export const fetchDailyData = async () => {
    try {
        const {
            data
        } = await axios.get(`${url}`);

        return data.map(({
            confirmed,
            deaths,
            reportDate: date
        }) => ({
            confirmed: confirmed.total,
            deaths: deaths.total,
            date
        }));
    } catch (error) {
        return error;
    }
};

export const fetchCountries = async () => {
    try {
        const {data: provincias } = await axios.get(`${url}/confirmed`);
        return provincias.map((provincia) => provincia.provinceState)
    } catch (error) {
        return error;
    }
};