import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/countries/CHILE';
export const fetchData = async (provincia) => {
    let changeableUrl = url;
    if (provincia) {
        changeableUrl = `${url}/confirmed`;
        try {
            const {
                data: [  
                    Metropolitana,
                    Valparaiso,
                    Antofagasta,
                    Biobio,
                    Ohiggins,
                    Tarapaca,
                    Maule,
                    Araucania,
                    Coquimbo,
                    Nuble,
                    Arica,
                    Lagos,
                    Magallanes,
                    Atacama,
                    Rios,
                    Aysen,
            ]
            } = await axios.get(changeableUrl);
            return {
                confirmed: Metropolitana.confirmed,
                recovered: Metropolitana.recovered,
                deaths: Metropolitana.deaths,
                lastUpdate: Metropolitana.lastUpdate,
            };
        } catch (error) {
            return error;
        }
    } else {
        try {
            const {
                data: {
                    Metropolitana,
                    Valparaiso,
                    Antofagasta,
                    Biobio,
                    Ohiggins,
                    Tarapaca,
                    Maule,
                    Araucania,
                    Coquimbo,
                    Nuble,
                    Arica,
                    Lagos,
                    Magallanes,
                    Atacama,
                    Rios,
                    Aysen,
                }
            } = await axios.get(changeableUrl);

            return {
                confirmed: Metropolitana.confirmed,
                recovered: Metropolitana.recovered,
                deaths: Metropolitana.deaths,
                lastUpdate: Metropolitana.lastUpdate,
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
        return provincias.map((provincia) => provincia.provinceState);
    } catch (error) {
        return error;
    }
};