'use strict'

const title = prompt('Как называется наш проект?')
const screens = prompt('Какие типы экранов нужно разработать? \n' +
    'пример: "Простые, Сложные, Интерактивные"')
const screenPrice = +(prompt('Сколько будет стоить данная работа'))
const adaptive = confirm('Нужен ли адаптив на сайте?')
const rollback = 35
const service1 = prompt('Какой дополнительный тип услуги нужен?')
const servicePrice1 = +(prompt('Сколько это будет стоить?'))
const service2 = prompt('Какой дополнительный тип услуги нужен?')
const servicePrice2 = +(prompt('Сколько это будет стоить?'))


const showTypeOf = (item) => {
    console.log(item, typeof item);
}

const getAllServicePrices = (priceOne, priceTwo) => {
    return priceOne + priceTwo
}

function getFullPrice(price, service) {
    return price + service
}

const getTitle = (item) => {
    item = item.trim()
    return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
}

const getRollbackMessage = (price) => {
    if (price >= 30000) {
        return 'Даём скидку в 10%'
    } else if (price >= 15000 && price < 30000) {
        return  'Даём скидку в 5%'
    } else if (price < 15000 && price > 0) {
        return 'Скидка не предусмотрена'
    }   else {
        return 'Что то пошло не так'
    }
}

const getServicePercentPrices = (fullPrice, rollback) => {
    return fullPrice - (fullPrice * (rollback/100))
}

let fullPrice = getFullPrice(screenPrice, getAllServicePrices(servicePrice1, servicePrice2))

getTitle(title)
showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)


console.log(screens.split(' '))
console.log(getRollbackMessage(fullPrice))
console.log(getServicePercentPrices(fullPrice, rollback))