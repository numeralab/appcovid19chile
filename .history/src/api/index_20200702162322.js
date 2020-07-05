import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/countries/Chile/';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `https://covid19.mathdro.id/api/countries/Chile/confirmed`;
    }

    try {
        const {
            data: {
                provinceState,
                confirmed,
                recovered,
                deaths,
                lastUpdate
            }
        } = await axios.get(changeableUrl);

        return {
            provinceState,
            confirmed,
            recovered,
            deaths,
            lastUpdate
        };
    } catch (error) {
        return error;
    }
};

export const fetchDailyData = async () => {
    try {
        const {
            data
        } = await axios.get(`${url}/daily`);

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
        const {
            data: {
                provinceState
            }
        } = await axios.get(`${url}/confirmed`);

        return provinceState.map((provinceState) => provinceState.name);
    } catch (error) {
        return error;
    }
    console.log(provinceState);
};