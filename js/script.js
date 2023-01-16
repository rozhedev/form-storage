// * Объекты содержащие в себе сообщения ошибок, мин. значения и т.д.

const currencies = {
    bitcoin: {
        name: 'Bitcoin',
        rate: 62820.14,
    },
    ethereum: {
        name: 'Ethereum',
        rate: 4142.28,
    },
    litecoin: {
        name: 'Litecoin',
        rate: 195.76,
    },
    dash: {
        name: 'Dash',
        rate: 207.34,
    },
    monero: {
        name: 'Monero',
        rate: 290.57,
    },
    usd: {
        name: 'USD',
        rate: 1,
    },
};

const limits = {
    bitcoin: {
        minAmount: 0.00023715,
        amount2: 0.00316286,
        amount3: 0.01581432,
        maxAmount: 0.47429399
    },
    ethereum: {
        minAmount: 0.00361364,
        amount2: 0.04818185,
        amount3: 0.24087348,
        maxAmount: 7.22620442
    },
    litecoin: {
        minAmount: 0.07666836,
        amount2: 1.02224486,
        amount3: 5.11122428,
        maxAmount: 153.40783699
    },
    dash: {
        minAmount: 0.07195257,
        amount2: 0.95936763,
        amount3: 4.79683815,
        maxAmount: 144.0218521
    },
    monero: {
        minAmount: 0.05093066,
        amount2: 0.67907545,
        amount3: 3.40657961,
        maxAmount: 102.19738831
    },
    usd: {
        minAmount: 20,
        amount2: 200,
        amount3: 1000,
        maxAmount: 30000
    },
    period: {
        minPeriod: 30,
        maxPeriod: 365
    }
};

const textsErrors = {
    bitcoin: {
        minAmountErr: `The amount of investment must be more than ${limits.bitcoin.minAmount} BTC`,
        maxAmountErr: `The amount of investment must be less than ${limits.bitcoin.maxAmount} BTC`
    },
    ethereum: {
        minAmountErr: `The amount of investment must be more than ${limits.ethereum.minAmount} ETH`,
        maxAmountErr: `The amount of investment must be less than ${limits.ethereum.maxAmount} ETH`
    },
    litecoin: {
        minAmountErr: `The amount of investment must be more than ${limits.litecoin.minAmount} LTC`,
        maxAmountErr: `The amount of investment must be less than ${limits.litecoin.maxAmount} LTC`
    },
    dash: {
        minAmountErr: `The amount of investment must be more than ${limits.dash.minAmount} DASH`,
        maxAmountErr: `The amount of investment must be less than ${limits.dash.maxAmount} DASH`
    },
    monero: {
        minAmountErr: `The amount of investment must be more than ${limits.monero.minAmount} XMR`,
        maxAmountErr: `The amount of investment must be less than ${limits.monero.maxAmount} XMR`
    },
    usd: {
        minAmountErr: `The amount of investment must be more than ${limits.usd.minAmount} USD`,
        maxAmountErr: `The amount of investment must be less than ${limits.usd.maxAmount} USD`
    },
    period: {
        minPeriodErr: `Minimum investment period ${limits.period.minPeriod} days`,
        maxPeriodErr: `Maximum investment period ${limits.period.maxPeriod} days`
    },
    blankInpErr: 'This field is required'
};

// * WALLET CONFIG

let wallets = {
    bitcoin: 'bc1qmjquzrcp6km26yswg29x3gdfn88zv4h06vq4tg',
    ethereum: '0x759F8dc635e0a7c418aF226C5eE89F01A2bB2eE0',
    litecoin: 'ltc1qgk4lc4nhl34l3kfxdpl3anj8tcr0fp0e5vgwum',
    dash: 'XrrhXn28dKn2CnjDuqLgNzgLQTXi1MfaRi',
    monero: 'moneroWallet',
    usd: 'usdWallet',
};

// * IMAGES PATHS

let imgPaths = {
    bitcoin: 'img/bitcoin.png',
    ethereum: 'img/ethereum.png',
    litecoin: 'img/litecoin.png',
    dash: 'img/dash.png',
    monero: 'img/monero.png',
    usd: 'img/usd.png',
};

// * TRANSACTION INFO

let transactionData = {
    currency: '',
    amount: '',
    period: '',
    wallet: '',
    imgPath: '',
};

let pageAddress = 'payment.html';

// * VARIABLES

const depositCurBtns = document.querySelectorAll('.deposit__currencies-btn');
const investInp = document.querySelector('.deposit__amount-inp');
const periodInp = document.querySelector('.deposit__period-inp');

const depositError = document.querySelector('.deposit__amount-error');
const periodError = document.querySelector('.deposit__period-error');
const depositBtn = document.querySelector('.deposit__btn');

let investValue, periodValue;


// * SELECT CURRENCY

function selectCurrency(
    e, btnClass, currencyBtns
) {
    e.preventDefault();
    let activeBtn = e.target;

    if (activeBtn.classList.contains(btnClass)) {
        for (let curBtn of currencyBtns) {
            curBtn.classList.remove("_active");
        }
        activeBtn.classList.add("_active");
    }
}


// * CHECK LIMITS

function checkLimits(
    inp, minAmount, amount2, amount3, maxAmount, errOutput, minAmountError, maxAmountError, blankErr
) {
    let value = +inp.value;

    if (value == '') {
        inp.classList.remove('_success');
        inp.classList.add('_error');
        errOutput.classList.add('_active');
        errOutput.textContent = blankErr;

    } else if (value < minAmount) {
        inp.classList.remove('_success');
        inp.classList.add('_error');
        errOutput.classList.add('_active');
        errOutput.textContent = minAmountError;

    } else if (value >= minAmount && value < amount2) {
        inp.classList.remove('_error');
        inp.classList.add('_success');
        errOutput.classList.remove('_active');

    } else if (value >= amount2 && value <= amount3) {
        inp.classList.remove('_error');
        inp.classList.add('_success');
        errOutput.classList.remove('_active');

    } else if (value > amount3 && value <= maxAmount) {
        inp.classList.remove('_error');
        inp.classList.add('_success');
        errOutput.classList.remove('_active');

    } else {
        inp.classList.remove('_success');
        inp.classList.add('_error');
        errOutput.classList.add('_active');
        errOutput.textContent = maxAmountError;
    }

    return value;
}


// * CHECK PERIOD

function checkPeriod(
    inp, errOutput, minPeriodErr, maxPeriodErr, blankErr
) {
    let value = +inp.value;

    if (value == '') {
        inp.classList.remove('_success');
        inp.classList.add('_error');
        errOutput.classList.add('_active');
        errOutput.textContent = blankErr;

    } else if (value < 30) {
        inp.classList.remove('_success');
        inp.classList.add('_error');
        errOutput.classList.add('_active');
        errOutput.textContent = minPeriodErr;

    } else if (value > 365) {
        inp.classList.remove('_success');
        inp.classList.add('_error');
        errOutput.classList.add('_active');
        errOutput.textContent = maxPeriodErr;

    } else {
        inp.classList.remove('_error');
        inp.classList.add('_success');
        errOutput.classList.remove('_active');
    }

    return value;
}


// * TRANSFER DATA

function transferData(curBtn, obj, newObj, curName, investvalue, periodValue, walletValue, imgPathValue) {
    if (curBtn.getAttribute('data-currency') == curName && curBtn.classList.contains('_active')) {
        obj.currency = curName;
        obj.amount = investvalue;
        obj.period = periodValue;
        obj.wallet = walletValue;
        obj.imgPath = imgPathValue;

        localStorage.setItem(newObj, JSON.stringify(obj));
    }
}


// * CALL FUNCTIONS

depositCurBtns.forEach((invBtn) => {
    invBtn.addEventListener("click", function (e) {
        selectCurrency(
            e, 'deposit__currencies-btn', depositCurBtns
        );
    });
});


if (investInp) {
    investInp.addEventListener('input', () => {
        for (btn of depositCurBtns) {

            if (btn.getAttribute('data-currency') == currencies.bitcoin.name && btn.classList.contains('_active')) {
                investValue = setInterval(function () {
                    checkLimits(
                        investInp, limits.bitcoin.minAmount, limits.bitcoin.amount2, limits.bitcoin.amount3, limits.bitcoin.maxAmount,
                        depositError, textsErrors.bitcoin.minAmountErr, textsErrors.bitcoin.maxAmountErr, textsErrors.blankInpErr
                    );
                }, 3000);

            } else if (btn.getAttribute('data-currency') == currencies.ethereum.name && btn.classList.contains('_active')) {
                investValue = setInterval(function () {
                    checkLimits(
                        investInp, limits.ethereum.minAmount, limits.ethereum.amount2, limits.ethereum.amount3, limits.ethereum.maxAmount,
                        depositError, textsErrors.ethereum.minAmountErr, textsErrors.ethereum.maxAmountErr, textsErrors.blankInpErr
                    );
                }, 3000);
            } else if (btn.getAttribute('data-currency') == currencies.litecoin.name && btn.classList.contains('_active')) {
                investValue = setInterval(function () {
                    checkLimits(
                        investInp, limits.litecoin.minAmount, limits.litecoin.amount2, limits.litecoin.amount3, limits.litecoin.maxAmount, depositError, textsErrors.litecoin.minAmountErr, textsErrors.litecoin.maxAmountErr, textsErrors.blankInpErr
                    );
                }, 3000);

            } else if (btn.getAttribute('data-currency') == currencies.dash.name && btn.classList.contains('_active')) {
                investValue = setInterval(function () {
                    checkLimits(
                        investInp, limits.dash.minAmount, limits.dash.amount2, limits.dash.amount3, limits.dash.maxAmount, depositError, textsErrors.dash.minAmountErr, textsErrors.dash.maxAmountErr, textsErrors.blankInpErr
                    );
                }, 3000);

            } else if (btn.getAttribute('data-currency') == currencies.monero.name && btn.classList.contains('_active')) {
                investValue = setInterval(function () {
                    checkLimits(
                        investInp, limits.monero.minAmount, limits.monero.amount2, limits.monero.amount3, limits.monero.maxAmount, depositError,
                        textsErrors.monero.minAmountErr, textsErrors.monero.maxAmountErr, textsErrors.blankInpErr
                    );
                }, 3000);

            } else if (btn.getAttribute('data-currency') == currencies.usd.name && btn.classList.contains('_active')) {
                investValue = setInterval(function () {
                    checkLimits(
                        investInp, limits.usd.minAmount, limits.usd.amount2, limits.usd.amount3, limits.usd.maxAmount, depositError, textsErrors.usd.minAmountErr, textsErrors.usd.maxAmountErr, textsErrors.blankInpErr
                    );
                }, 3000);
            }
        }
    });
}


if (periodInp) {
    periodInp.addEventListener('input', function () {
        periodValue = setInterval(function () {
            checkPeriod(
                periodInp, periodError, textsErrors.period.minPeriodErr, textsErrors.period.maxPeriodErr, textsErrors.blankInpErr
            );
        }, 3000);
    });
}


// * REDIRECT ON PAYMENT PAGE

if (depositBtn) {
    depositBtn.addEventListener('click', function () {
        if (investInp.classList.contains('_success') && periodInp.classList.contains('_success')) {
            for (btn of depositCurBtns) {
                
                // * SAVE TO LOCAL STORAGE
                transferData(
                    btn, transactionData, 'dataRaw', currencies.bitcoin.name, investInp.value, periodInp.value, wallets.bitcoin, imgPaths.bitcoin
                );

                transferData(
                    btn, transactionData, 'dataRaw', currencies.ethereum.name, investInp.value, periodInp.value, wallets.ethereum, imgPaths.ethereum
                );

                transferData(
                    btn, transactionData, 'dataRaw', currencies.litecoin.name, investInp.value, periodInp.value, wallets.litecoin, imgPaths.litecoin
                );

                transferData(
                    btn, transactionData, 'dataRaw', currencies.dash.name, investInp.value, periodInp.value, wallets.dash, imgPaths.dash
                );

                transferData(
                    btn, transactionData, 'dataRaw', currencies.monero.name, investInp.value, periodInp.value, wallets.monero, imgPaths.monero
                );

                transferData(
                    btn, transactionData, 'dataRaw', currencies.usd.name, investInp.value, periodInp.value, wallets.usd, imgPaths.usd
                );
            }
            depositBtn.setAttribute('href', pageAddress);

        } else {
            depositBtn.setAttribute('href', '');
        }
    });
}

// ! PAYMENT PAGE FUNCTIONALITY

const curOutput = document.getElementById('pay-currency-output');
const amountOutput = document.getElementById('pay-amount-output');
const periodOutput = document.getElementById('pay-period-output');
const invoiceId = document.getElementById('pay-id-output');

const curOutput2 = document.getElementById('pay-currency-output2');
const amountOutput2 = document.getElementById('pay-amount-output2');
const walletOutput = document.getElementById('pay-wallet-output');
const qrCode = document.getElementById('qr-code');

const timeOutput = document.getElementById('time-output');
const copyAmount = document.getElementById('copy-amount');
const amountTooltip = document.getElementById('amount-tooltip');
const copyAddress = document.getElementById('copy-address');
const addressTooltip = document.getElementById('address-tooltip');

// * TIMER

let time = 1800;

function timeCount() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    time--;

    timeOutput.textContent = `${minutes} m ${seconds} s`;
}

if (timeOutput) {
    timeCount();
    setInterval(timeCount, 1000);
}

// * DATA TRANSFER

let dataRaw = JSON.parse(localStorage.getItem('dataRaw'));

function setCreditails() {
    curOutput.textContent = dataRaw.currency;
    amountOutput.textContent = dataRaw.amount;
    periodOutput.textContent = dataRaw.period;

    curOutput2.textContent = dataRaw.currency;
    amountOutput2.value = dataRaw.amount;
    walletOutput.value = dataRaw.wallet;
    qrCode.setAttribute('src', dataRaw.imgPath);

    // * Generate random string
    let randomStr = new RandExp(/[0-9]{8}/).gen();
    invoiceId.textContent = randomStr;

    localStorage.clear();
}

if (walletOutput) {
    setCreditails();
}

// * COPY BTN

function copyData(btn, input, tooltip) {
    if (btn) {
        btn.addEventListener('click', function () {
            window.navigator.clipboard.writeText(input.value)
            tooltip.textContent = 'Copied!';
        });
    }
}

copyData(copyAmount, amountOutput2, amountTooltip);
copyData(copyAddress, walletOutput, addressTooltip);