import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/countries/CHILE';
export const fetchData = async (provincia) => {
    let changeableUrl = url;

    if (provincia) {
        try {
                    const {
                        data
                    } = await axios.get(`${url}/confirmed`);
                    return data.map(({
                        confirmed,
                        deaths,
                        reportDate: date
                    }) => ({
                        confirmed: confirmed,
                        deaths: deaths,
                        date
                    }));
                    }
                    catch (error) {
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
        } = await axios.get(`${url}/confirmed`);

        return data.map(({
            confirmed,
            deaths,
            reportDate: date
        }) => ({
            confirmed: confirmed,
            deaths: deaths,
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