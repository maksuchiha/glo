let title = "glo";
let screens = "Простые, Сложные, Интерактивные";
let lowerScreens = screens.toLowerCase();
let lowerScreensData = lowerScreens.split(", ");
let screenPrice = 50;
let rollback = 35;
let fullPrice = 1000;
let adaptive = true;


console.log(typeof title);
console.log(screens.length);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(`Стоимость верстки экранов ${screenPrice} долларов`);
console.log(`Стоимость разработки сайта ${fullPrice} долларов`);

console.log(lowerScreensData)

let back = () => {
    return fullPrice * (rollback/100)
}

console.log(back());