import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/countries/Chile';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`;
        // changeableUrl = `${url}/countries/Chile`;
    }

    try {
        const {
            data: {
                confirmed,
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
};

export const fetchDailyData = async () => {
    try {
        const {
            data
        } = await axios.get(`${url}/confirmed`);

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
                countries
            }
        } = await axios.get(`${url}/confirmed`);

        return countries.map((country) => country.name);
    } catch (error) {
        return error;
    }
};