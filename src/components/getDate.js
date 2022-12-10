export default function getDate() {
    let yourDate = new Date();
    const date = yourDate.toISOString().split('T')[0];
    const time = yourDate.toISOString().split('T')[1];
    
    return `${date} : ${time}`
}