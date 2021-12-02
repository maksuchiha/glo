'use strict'

let title
let screens
let screenPrice
let adaptive
let rollback = 35
let fullPrice
let allServicePrices
let servicePercentPrices
let service1
let service2

const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num)
}

const asking = () => {
    title = prompt('Как называется наш проект?')
    screens = prompt('Какие типы экранов нужно разработать? \n' +
        'пример: "Простые, Сложные, Интерактивные"')

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?')
    } while (!isNumber(screenPrice))

    adaptive = confirm('Нужен ли адаптив на сайте?')
}

const showTypeOf = (item) => {
    console.log(item, typeof item)
}

const getAllServicePrices = () => {
    let sum1 = 0
    let sum2 = 0
    let result
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?')
            do {
                sum1 = prompt("Сколько будет стоить?")
            } while (!isNumber(sum1))
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?')
            do {
                sum2 = prompt("Сколько будет стоить?")
            } while (!isNumber(sum2))
        }
        result = +sum1 + +sum2
    }
    console.log(result)
    return result
}

function getFullPrice(price, service) {
    return parseInt(price) + parseInt(service)
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
    return fullPrice - (fullPrice * (rollback / 100))
}

asking()
allServicePrices = getAllServicePrices()
fullPrice = getFullPrice(screenPrice, allServicePrices)
servicePercentPrices = getServicePercentPrices(fullPrice, rollback)
title = getTitle(title)

showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)


console.log(getRollbackMessage(fullPrice))
console.log(screens.length)
console.log(servicePercentPrices)
console.log("Стоимость вёрстки экранов " + screenPrice + " долларов" + " и " + "стоимость разработки сайта " + fullPrice + " долларов")