'use strict'

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 35,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrices: 0,
    service1: '',
    service2: '',
    asking: () => {
        appData.title = prompt('Как называется наш проект?')
        appData.screens = prompt('Какие типы экранов нужно разработать? \n' +
            'пример: "Простые, Сложные, Интерактивные"')
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?')
        } while (appData.isNumber(appData.screenPrice))

        appData.adaptive = confirm('Нужен ли адаптив на сайте?')
    },
    isNumber: (num) => {
        return isNaN(parseFloat(num)) && !isFinite(num)
    },
    getAllServicePrices: () => {
        let sum = 0
        for (let i = 0; i < 2; i++) {
            let price = 0
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?')
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?')
            }
            do {
                price = prompt("Сколько будет стоить?")
            } while (appData.isNumber(price))

            sum += +price
        }
        return sum
    },
    getFullPrice: (price, service) => {
        return parseInt(price) + parseInt(service)
    },
    getTitle: (item) => {
        item = item.trim()
        return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
    },
    getRollbackMessage: (price) => {
        if (price >= 30000) {
            return 'Даём скидку в 10%'
        } else if (price >= 15000 && price < 30000) {
            return  'Даём скидку в 5%'
        } else if (price < 15000 && price > 0) {
            return 'Скидка не предусмотрена'
        }   else {
            return 'Что то пошло не так'
        }
    },
    getServicePercentPrices: (fullPrice, rollback) => {
        return fullPrice - (fullPrice * (rollback / 100))
    },
    start: () => {
        appData.asking()
        appData.allServicePrices = appData.getAllServicePrices()
        appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices)
        appData.servicePercentPrices = appData.getServicePercentPrices(appData.fullPrice, appData.rollback)
        appData.title = appData.getTitle(appData.title)
        appData.logger()
    },
    logger: () => {
        console.log(appData.fullPrice)
        console.log(appData.servicePercentPrices)
        for (let key in appData) {
            console.log(key + appData[key])
        }
    }
}

appData.start()