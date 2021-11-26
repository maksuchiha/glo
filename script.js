const title = "glo";
const screens = "Простые, Сложные, Интерактивные";
const lowerScreens = screens.toLowerCase();
const screenPrice = 50;
const rollback = 35;
const fullPrice = 1000;
const adaptive = true;


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} долларов`);
console.log(`Стоимость разработки сайта ${fullPrice} долларов`);
console.log(lowerScreens.split(", "));
console.log(fullPrice * (rollback/100));


