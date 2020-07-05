import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/countries/CHILE';
export const fetchData = async (provincia) => {
    let changeableUrl = url;
    if (provincia) {
        let region = `${provincia}`;
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
                    rios,
                    Aysen,
            ]
            } = await axios.get(changeableUrl);
            console.log(region.confirmed);
            return {
                confirmed: provincia.confirmed,
                recovered: provincia.recovered,
                deaths: provincia.deaths,
            };
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
                    lastUpdate,
                    active,
                }
            } = await axios.get(changeableUrl);

            return {
                confirmed,
                recovered,
                deaths,
                lastUpdate,
                active,
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