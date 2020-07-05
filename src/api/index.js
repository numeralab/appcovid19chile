import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/countries/CHILE';
export const fetchData = async (provincia) => {
    let changeableUrl = url;
    if (provincia) {
        changeableUrl = `${url}/confirmed`;
        try {
            const data = await axios.get(changeableUrl);
            const filteredData = data.data.find((province) => {
                if (province.provinceState == provincia) {
                    return province;
                };
            })
            return {
                confirmed: { value: filteredData.confirmed }, recovered: { value: filteredData.recovered }, deaths: { value: filteredData.deaths}, active: { value: filteredData.active },
                lastUpdate: new Date(filteredData.lastUpdate).toISOString()
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

            console.log("fetchdata else: ", confirmed,
                recovered,
                deaths,
                lastUpdate, active);
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