'use strict'

let title = "glo";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 50;
const rollback = 35;
let fullPrice = 1000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} долларов`);
console.log(`Стоимость разработки сайта ${fullPrice} долларов`);
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback/100));


title = prompt('Как называется наш проект?');
screens = prompt('Какие типы экранов нужно разработать? \n' +
    'пример: "Простые, Сложные, Интерактивные"');
screenPrice = +(prompt('Сколько будет стоить данная работа'));
adaptive = confirm('Нужен ли адаптив на сайте?');

const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +(prompt('Сколько это будет стоить?'));
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +(prompt('Сколько это будет стоить?'));

fullPrice = screenPrice + servicePrice1 + servicePrice2;

if (fullPrice > 30000) {
    fullPrice -= Math.ceil(fullPrice / 100 * 10);
    console.log('Даём скидку в 10%');
} else if (fullPrice > 15000 && fullPrice < 30000) {
    fullPrice -= Math.ceil(fullPrice / 100 * 5);
    console.log('Даём скидку в 5%');
} else if (fullPrice < 15000 && fullPrice > 0) {
    console.log('Скидка не предусмотрена');
}   else {
    console.log('Что то пошло не так');
}

const servicePercentPrice = fullPrice - (fullPrice * (rollback/100));

if (isNaN(servicePercentPrice) || servicePercentPrice < 1) {
    console.log('ошибка');
} else {
    console.log(Math.ceil(servicePercentPrice));
}