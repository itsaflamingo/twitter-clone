export default function getDateTime() {
    let yourDate = new Date();
    const date = yourDate.toDateString();
    const time = yourDate.toLocaleTimeString();
    
    const getOnlyDate = () => yourDate.toDateString();
    const getOnlyTime = () => yourDate.toLocaleTimeString();
    const getDateAndTime = () => `${date}:${time}`;
    
    return {
        getOnlyDate,
        getOnlyTime,
        getDateAndTime
    }
}