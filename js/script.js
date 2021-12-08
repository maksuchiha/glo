'use strict'

const calcPrice = document.getElementsByTagName("h1")
const calcResetButtons = document.getElementsByClassName("handler_btn")
const calcButton = calcResetButtons[0]
const resetButton = calcResetButtons[1]
const addPlus = document.querySelector(".screen-btn")
const otherItems = document.querySelectorAll('.other-items')
const rollback = document.querySelector('.rollback > .main-controls__range > input')
const rangeValue = document.querySelector('.rollback > .main-controls__range > .range-value')
const totalPrice = document.getElementsByClassName('total-input')[0]
const totalCount = document.getElementsByClassName('total-input')[1]
const totalOther = document.getElementsByClassName('total-input')[2]
const totalAllPrice = document.getElementsByClassName('total-input')[3]
const totalRollback = document.getElementsByClassName('total-input')[4]
const screen = document.querySelectorAll('.screen')
const otherPercent = [otherItems[0], otherItems[1]]
const otherNumber = [otherItems[2], otherItems[3], otherItems[4], otherItems[5], otherItems[6]]


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
                price = +prompt("Сколько будет стоить?")
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
    isString: (item) => {
        const check = /^-?\d+\.?\d*$/
        return check.test(item)
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