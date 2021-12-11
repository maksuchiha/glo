'use strict'

const calcTitle = document.getElementsByTagName("h1")[0]
const calcBtn = document.getElementsByClassName("handler_btn")[0]
const resetBtn = document.getElementsByClassName("handler_btn")[1]
const addPlus = document.querySelector(".screen-btn")
const otherItems = document.querySelectorAll('.other-items')
const rollback = document.querySelector('.rollback > .main-controls__range > input')
const rangeValue = document.querySelector('.rollback > .main-controls__range > .range-value')
const totalPrice = document.getElementsByClassName('total-input')[0]
const totalCount = document.getElementsByClassName('total-input')[1]
const totalOther = document.getElementsByClassName('total-input')[2]
const totalAllPrice = document.getElementsByClassName('total-input')[3]
const totalRollback = document.getElementsByClassName('total-input')[4]
const screens = document.querySelectorAll('.screen')
const otherPercent = document.querySelectorAll('.main-controls__views .percent')
const otherNumber = document.querySelectorAll('.main-controls__views .number')


const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber : 0,
    fullPrice: 0,
    servicePercentPrices: 0,
    servicesPercent: {},
    servicesNumber: {},
    counterScreens: () => {
        const screensInput = document.querySelectorAll('.screen input')
        let count = 0
        screensInput.forEach((item) => {
            count += +item.value
        })
        return count
    },
    isError: false,
    init: () => {
        appData.addTitle()
        addPlus.addEventListener('click', appData.addScreenBlock)
        calcBtn.addEventListener('click', appData.isValidate)
        rollback.addEventListener('input', () => {
            rangeValue.textContent = `${rollback.value}%`
            appData.rollback = +rollback.value
        })
    },
    addTitle: () => {
        document.title = calcTitle.textContent
    },
    addScreenBlock: () => {
        const screens = document.querySelectorAll('.screen')
        const cloneScreen = screens[0].cloneNode(true)
        screens[screens.length -1].after(cloneScreen)
    },
    isValidate: () => {
        const screensSelect = document.querySelectorAll('.screen select')
        const screensInput = document.querySelectorAll('.screen input')
        screensSelect.forEach((item) => {
            appData.isError = false
            if (item.selectedIndex === 0) {
                appData.isError = true
            } else if (item.selectedIndex === 0 && item.selectedIndex  !== 0) {
                appData.isError = true
            }
            screensInput.forEach((item) => {
                if (item.value.trim() === '') {
                    appData.isError = true
                } else if (item.value.trim() === '' && item.value.trim() !== '') {
                    appData.isError = true
                } else if (appData.isNumber(item.value)) {
                    appData.isError = true
                }
            })
        })
        if (!appData.isError) {
            appData.start()
        }
    },
    isNumber: (num) => {
        return isNaN(parseFloat(num)) && !isFinite(num)
    },
    addPrices: () => {
        appData.screenPrice = appData.screens.reduce((accumulator, item) => +accumulator + +item.price, 0)

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }

        appData.fullPrice = +appData.screenPrice + +appData.servicePricesNumber + +appData.servicePricesPercent
        appData.servicePercentPrices = appData.fullPrice - (appData.rollback * (appData.fullPrice / 100))

    },
    showResult: () => {
        totalPrice.value = appData.screenPrice
        totalOther.value = appData.servicePricesNumber + appData.servicePricesPercent
        totalAllPrice.value = appData.fullPrice
        totalRollback.value = appData.servicePercentPrices
        totalCount.value = appData.counterScreens()
    },
    addScreens: () => {
        const screens = document.querySelectorAll('.screen')
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            })
        })
    },
    addServices: () => {
        otherPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }
        })

        otherNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }
        })
    },
    addReset: () => {
        appData.screens = []
        appData.servicePricesPercent = 0
        appData.servicePricesNumber = 0
    },
    start: () => {
        appData.addScreens()
        appData.addServices()
        appData.addPrices()
        // appData.logger()
        appData.showResult()
        appData.counterScreens()
        appData.addReset()
    },
    logger: () => {
        console.log(appData.fullPrice)
        console.log(appData.servicePercentPrices)
    }
}

appData.init()