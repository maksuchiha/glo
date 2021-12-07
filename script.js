'use strict'

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 35,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrices: 0,
    services: {},
    isString: (item) => {
        const check = /^-?\d+\.?\d*$/
        return check.test(item)
    },
    asking: () => {
        let title

        do {
            title = prompt('Как называется ваш проект?')
        } while (appData.isString(title))
        appData.title = title

        for (let i = 0; i < 2; i++) {
            let name
            let price = 0
            do {
                name = prompt('Какие типы экранов нужно разработать?')
            } while (appData.isString(name))

            do {
                price = prompt("Сколько будет стоить?")
            } while (appData.isNumber(price))

            appData.screens.push({id: i, name, price})
        }

        for (let i = 0; i < 2; i++) {
            let name
            let price = 0

            do {
                name = prompt('Какой дополнительный тип услуги нужен?')
            } while (appData.isString(name))

            do {
                price = +prompt("Сколько будет стоить?")
            } while (appData.isNumber(price))
            appData.services = {id: i, name, price}
        }
        appData.adaptive = confirm('Нужен ли адаптив на сайте?')
    },
    addPrices: () => {

        appData.screenPrice = appData.screens.reduce((accumulator, item) => +accumulator + +item.price, 0)

        for (let key in appData.services) {
            appData.allServicePrices += appData.services.price
        }
    },
    isNumber: (num) => {
        return isNaN(parseFloat(num)) && !isFinite(num)
    },
    getFullPrice: (price, service) => {
        appData.fullPrice = +price + +service
    },
    getTitle: (item) => {
        item = item.trim()
        appData.title = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
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
        appData.servicePercentPrices = fullPrice - (fullPrice * (rollback / 100))
    },
    start: () => {
        appData.asking()
        appData.addPrices()
        appData.getFullPrice(appData.screenPrice, appData.allServicePrices)
        appData.getServicePercentPrices(appData.fullPrice, appData.rollback)
        appData.getTitle(appData.title)
        appData.logger()
    },
    logger: () => {
        console.log(appData.fullPrice)
        console.log(appData.servicePercentPrices)
    }
}

appData.start()