export default function convertJavaDateToStr(javaDate){
    const date = new Date(javaDate)
    const yyyy = date.getFullYear();  // get the full year (4 bit，e.g. 1970)
    const MM =date.getMonth() + 1;    // 0-11，remember +1 !
    const dd =date.getDate();
    const hh =date.getHours();
    const mm =date.getMinutes();
    const ss =date.getSeconds();
    const dateStr = "on " + dd + "." + MM + "." + yyyy + " at "  + hh + ":" + mm + ':' +ss
    return dateStr
}