import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/countries/CHILE';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/confirmed`;

    }

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
};

