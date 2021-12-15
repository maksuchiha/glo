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
const cms = document.querySelector('.cms')
const cmsCheckSelect = document.getElementById('cms-select')
const hiddenItemsCms = cms.querySelector('.hidden-cms-variants')
const hiddenInputCms = document.querySelector('.hidden-cms-variants .main-controls__input')


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
    cmsPercent: 0,
    counterScreens: function () {
        const screensInput = document.querySelectorAll('.screen input')
        let count = 0
        screensInput.forEach((item) => {
            count += +item.value
        })
        return count
    },
    isError: false,
    init: function () {
        this.addTitle()
        addPlus.addEventListener('click', this.addScreenBlock)
        calcBtn.addEventListener('click', this.isValidate.bind(this))
        rollback.addEventListener('input', () => {
            rangeValue.textContent = `${rollback.value}%`
            this.rollback = +rollback.value
            this.isValidate()
        })
        resetBtn.addEventListener('click' , () => {
            this.addUnblock()
            this.resetValue()
        })
        cms.querySelector('#cms-open').addEventListener('click', () => {
            this.addCms()
        })
        cmsCheckSelect.addEventListener('change', (e) => {
            if (e.target.selectedIndex === 2) {
                hiddenInputCms.style.display = 'flex'
            } else {
                hiddenInputCms.querySelector('input').value = ''
                hiddenInputCms.style.display = 'none'
            }
        })
    },
    addTitle: function () {
        document.title = calcTitle.textContent
    },
    addScreenBlock: function () {
        const screens = document.querySelectorAll('.screen')
        const cloneScreen = screens[0].cloneNode(true)
        cloneScreen.querySelector('input').value = ''
        screens[screens.length -1].after(cloneScreen)
    },
    isValidate: function () {
        const screensSelect = document.querySelectorAll('.screen select')
        const screensInput = document.querySelectorAll('.screen input')
        screensSelect.forEach((item) => {
            this.isError = false
            if (item.selectedIndex === 0) {
                this.isError = true
            } else if (item.selectedIndex === 0 && item.selectedIndex  !== 0) {
                this.isError = true
            }
            screensInput.forEach((item) => {
                if (item.value.trim() === '') {
                    this.isError = true
                } else if (item.value.trim() === '' && item.value.trim() !== '') {
                    this.isError = true
                } else if (this.isNumber(item.value)) {
                    this.isError = true
                }
            })
        })
        if (!this.isError) {
            this.start()
        }
    },
    isNumber: (num) => {
        return isNaN(parseFloat(num)) && !isFinite(num)
    },
    addPrices: function () {
        this.screenPrice = this.screens.reduce((accumulator, item) => +accumulator + +item.price, 0)

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }


        this.fullPrice = +this.screenPrice + +this.servicePricesNumber + +this.servicePricesPercent

        if (!this.isNumber(+hiddenInputCms.querySelector('input').value)) {
            cmsCheckSelect.querySelector('#cms-other-select').value = +hiddenInputCms.querySelector('input').value
            this.cmsPercent = this.fullPrice + (+cmsCheckSelect.value * (this.fullPrice / 100))
            this.fullPrice = this.cmsPercent
            this.servicePercentPrices = this.fullPrice - (this.rollback * (this.fullPrice / 100))
        } else {
            this.servicePercentPrices = this.fullPrice - (this.rollback * (this.fullPrice / 100))
        }
    },
    addCms: () => {
        const cmsCheck = cms.querySelector('#cms-open')
        if (cmsCheck.checked) {
            hiddenItemsCms.style.display = 'flex'
        } else {
            hiddenItemsCms.style.display = 'none'
        }
    },
    showResult: function () {
        totalPrice.value = this.screenPrice
        totalOther.value = this.servicePricesNumber + this.servicePricesPercent
        totalAllPrice.value = this.fullPrice
        totalRollback.value = this.servicePercentPrices
        totalCount.value = this.counterScreens()
    },
    addScreens: function () {
        const screens = document.querySelectorAll('.screen')
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent
            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            })
        })
    },
    addServices: function () {
        otherPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }
        })

        otherNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
        })
    },
    addBlock: () => {
        const input = document.querySelectorAll('.screen input')
        const selector = document.querySelectorAll('.screen select')
        const checkBox = document.querySelectorAll('.main-controls__checkbox input')
        const otherInput = document.getElementById('cms-other-input')
        input.forEach((item) => {
            item.setAttribute('disabled', 'disabled')
        })
        selector.forEach((item) => {
            item.setAttribute('disabled', 'disabled')
        })
        checkBox.forEach((item) => {
            item.setAttribute('disabled', 'disabled')
        })
        addPlus.setAttribute('disabled', 'disabled')
        cmsCheckSelect.setAttribute('disabled', 'disabled')
        otherInput.setAttribute('disabled', 'disabled')
        calcBtn.style.display = 'none'
        resetBtn.style.display = 'flex'
    },
    addUnblock: () => {
        const input = document.querySelectorAll('.screen input')
        const selector = document.querySelectorAll('.screen select')
        const checkBox = document.querySelectorAll('.main-controls__checkbox input')
        const otherInput = document.getElementById('cms-other-input')
        input.forEach((item) => {
            item.removeAttribute('disabled')
            item.value = ''
        })
        selector.forEach((item) => {
            item.removeAttribute('disabled')
            item.value = ''
        })
        checkBox.forEach((item) => {
            if (item.checked) {
                item.checked = false
            }
            item.removeAttribute('disabled')
        })
        addPlus.removeAttribute('disabled')
        cmsCheckSelect.removeAttribute('disabled')
        otherInput.removeAttribute('disabled')
        const screens = document.querySelectorAll('.screen')
        screens.forEach((item, index) => {
            if (index !== 0) {
                item.remove()
            }
        })
        rangeValue.textContent = `${0}%`
        this.rollback = 0
        rollback.value = 0
        calcBtn.style.display = 'flex'
        resetBtn.style.display = 'none'
        cmsCheckSelect.value = ''
        hiddenItemsCms.style.display = 'none'
        hiddenInputCms.style.display = 'none'
    },
    resetValue: function() {
        totalPrice.value = '0'
        totalOther.value = '0'
        totalAllPrice.value = '0'
        totalRollback.value = '0'
        totalCount.value = '0'
        this.fullPrice = 0
        this.rollback = 0
        this.servicePricesPercent = 0
        this.servicePricesNumber = 0
        this.servicesPercent = 0
        this.servicesNumber = 0
        this.fullPrice = 0
        this.servicePercentPrices = 0
        this.cmsPercent = 0
        this.screenPrice = 0
    },
    addReset: function () {
        this.screens = []
        this.servicePricesPercent = 0
        this.servicePricesNumber = 0
    },
    start: function () {
        this.addScreens()
        this.addServices()
        this.addPrices()
        this.showResult()
        this.counterScreens()
        this.addReset()
        this.addBlock()
    },
    logger: function () {

    }
}

appData.init()


