import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/countries/CHILE';
export const fetchData = async (provincia) => {
    let changeableUrl = url;

    if (provincia) {
        changeableUrl = `${url}/confirmed`;
        try {
            //const {data: [{confirmed, recovered, deaths, lastUpdate, provinceState}] } = await axios.get(`${url}/confirmed`);
            //console.log(provinceState);
            //return {
            //    data: [{confirmed, recovered, deaths, lastUpdate, provinceState}]
            //};
            const {data: provincias } = await axios.get(`${url}/confirmed`);
            const {
                data: {
                    confirmed = parseInt(provincias[1].confirmed),
                    recovered = parseInt(provincias[1].recovered),
                    deaths = parseInt(provincias[1].deaths),
                    lastUpdate = provincias[1].lastUpdate
                }
            } = await axios.get(`${url}/confirmed`);
            console.log(parseInt(provincias[1].confirmed).value);
            return {
                confirmed,
                recovered,
                deaths,
                lastUpdate,
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