export default function getDate() {
    let yourDate = new Date();
    const date = yourDate.toDateString();
    const time = yourDate.toLocaleTimeString();
    
    return `${date}:${time}`;
}