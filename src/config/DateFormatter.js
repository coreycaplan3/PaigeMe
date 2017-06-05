import moment from "moment";

export const formatUnixDateToUtc = (unixTimeMillis) => {
    return moment(unixTimeMillis);
};