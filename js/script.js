// * DATA OBJECTS

const CUR_LIST = {
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

const CUR_LIMITS = {
    bitcoin: {
        min: 0.00023715,
        amount2: 0.00316286,
        amount3: 0.01581432,
        max: 0.47429399
    },
    ethereum: {
        min: 0.00361364,
        amount2: 0.04818185,
        amount3: 0.24087348,
        max: 7.22620442
    },
    litecoin: {
        min: 0.07666836,
        amount2: 1.02224486,
        amount3: 5.11122428,
        max: 153.40783699
    },
    dash: {
        min: 0.07195257,
        amount2: 0.95936763,
        amount3: 4.79683815,
        max: 144.0218521
    },
    monero: {
        min: 0.05093066,
        amount2: 0.67907545,
        amount3: 3.40657961,
        max: 102.19738831
    },
    usd: {
        min: 20,
        amount2: 200,
        amount3: 1000,
        max: 30000
    },
    period: {
        min: 30,
        max: 365
    }
};

const TEXT_ERRORS = {
    bitcoin: {
        minAmount: `The amount of investment must be more than ${CUR_LIMITS.bitcoin.min} BTC`,
        maxAmount: `The amount of investment must be less than ${CUR_LIMITS.bitcoin.max} BTC`
    },
    ethereum: {
        minAmount: `The amount of investment must be more than ${CUR_LIMITS.ethereum.min} ETH`,
        maxAmount: `The amount of investment must be less than ${CUR_LIMITS.ethereum.max} ETH`
    },
    litecoin: {
        minAmount: `The amount of investment must be more than ${CUR_LIMITS.litecoin.min} LTC`,
        maxAmount: `The amount of investment must be less than ${CUR_LIMITS.litecoin.max} LTC`
    },
    dash: {
        minAmount: `The amount of investment must be more than ${CUR_LIMITS.dash.min} DASH`,
        maxAmount: `The amount of investment must be less than ${CUR_LIMITS.dash.max} DASH`
    },
    monero: {
        minAmount: `The amount of investment must be more than ${CUR_LIMITS.monero.min} XMR`,
        maxAmount: `The amount of investment must be less than ${CUR_LIMITS.monero.max} XMR`
    },
    usd: {
        minAmount: `The amount of investment must be more than ${CUR_LIMITS.usd.min} USD`,
        maxAmount: `The amount of investment must be less than ${CUR_LIMITS.usd.max} USD`
    },
    period: {
        minInvest: `Minimum investment period ${CUR_LIMITS.period.min} days`,
        maxInvest: `Maximum investment period ${CUR_LIMITS.period.max} days`
    },
    blankInp: 'This field is required'
};

const WALLETS = {
    bitcoin: 'bc1qmjquzrcp6km26yswg29x3gdfn88zv4h06vq4tg',
    ethereum: '0x759F8dc635e0a7c418aF226C5eE89F01A2bB2eE0',
    litecoin: 'ltc1qgk4lc4nhl34l3kfxdpl3anj8tcr0fp0e5vgwum',
    dash: 'XrrhXn28dKn2CnjDuqLgNzgLQTXi1MfaRi',
    monero: 'moneroWallet',
    usd: 'usdWallet',
};

const IMG_PATHS = {
    bitcoin: 'img/bitcoin.png',
    ethereum: 'img/ethereum.png',
    litecoin: 'img/litecoin.png',
    dash: 'img/dash.png',
    monero: 'img/monero.png',
    usd: 'img/usd.png',
};

const STATE_LIST = {
    active: "_active",
    success: "_success",
    error: "_error",
}

let curBtnsClass = "deposit__currencies-btn";
let pageAddress = "payment.html";
let investValue, periodValue;

const DEPOSIT_NODES = {
    curBtns: document.querySelectorAll(`.${curBtnsClass}`),
    investInp: document.querySelector('.deposit__amount-inp'),
    periodInp: document.querySelector('.deposit__period-inp'),
    investErrOutput: document.querySelector('.deposit__amount-error'),
    periodErrOutput: document.querySelector('.deposit__period-error'),
    formBtn: document.querySelector('.deposit__btn'),  
}

// * Payments nodes
const PAY_NODES = {
    curOutput: document.getElementById('pay-currency-output'),
    amountOutput: document.getElementById('pay-amount-output'),
    periodOutput: document.getElementById('pay-period-output'),
    invoiceId: document.getElementById('pay-id-output'),
    curOutput2: document.getElementById('pay-currency-output2'),
    amountOutput2: document.getElementById('pay-amount-output2'),
    walletOutput: document.getElementById('pay-wallet-output'),
    qrCode: document.getElementById('qr-code'),
    timeOutput: document.getElementById('time-output'),
    copyAmount: document.getElementById('copy-amount'),
    amountTooltip: document.getElementById('amount-tooltip'),
    copyAddress: document.getElementById('copy-address'),
    addressTooltip: document.getElementById('address-tooltip'),
}

// * TRANSACTION INFO

let transactionData = {
    currency: '',
    amount: '',
    period: '',
    wallet: '',
    imgPath: '',
};


// * SELECT CURRENCY

function selectCurrency(e, btnClass, currencyBtns) {
    e.preventDefault();
    let activeBtn = e.target;

    if (activeBtn.classList.contains(btnClass)) {
        for (let curBtn of currencyBtns) {
            curBtn.classList.remove(STATE_LIST.active);
        }
        activeBtn.classList.add(STATE_LIST.active);
    }
}


// * CHECK CUR_LIMITS

function checkLimits(
    inp, minAmount, amount2, amount3, maxAmount, errOutput, minAmountError, maxAmountError, blankErr
) {
    let value = +inp.value;

    // if (value >= minAmount && value <= maxAmount) {

    // }

    if (value == '') {
        inp.classList.remove(STATE_LIST.success);
        inp.classList.add(STATE_LIST.error);
        errOutput.classList.add(STATE_LIST.active);
        errOutput.textContent = blankErr;

    } else if (value < minAmount) {
        inp.classList.remove(STATE_LIST.success);
        inp.classList.add(STATE_LIST.error);
        errOutput.classList.add(STATE_LIST.active);
        errOutput.textContent = minAmountError;

    } else if (value >= minAmount && value < amount2) {
        inp.classList.remove(STATE_LIST.error);
        inp.classList.add(STATE_LIST.success);
        errOutput.classList.remove(STATE_LIST.active);

    } else if (value >= amount2 && value <= amount3) {
        inp.classList.remove(STATE_LIST.error);
        inp.classList.add(STATE_LIST.success);
        errOutput.classList.remove(STATE_LIST.active);

    } else if (value > amount3 && value <= maxAmount) {
        inp.classList.remove(STATE_LIST.error);
        inp.classList.add(STATE_LIST.success);
        errOutput.classList.remove(STATE_LIST.active);

    } else {
        inp.classList.remove(STATE_LIST.success);
        inp.classList.add(STATE_LIST.error);
        errOutput.classList.add(STATE_LIST.active);
        errOutput.textContent = maxAmountError;
    }

    return value;
}


// * CHECK PERIOD

function checkPeriod(
    inp, errOutput, minPeriod, maxPeriod, blankErr
) {
    let value = +inp.value;

    if (value == '') {
        inp.classList.remove(STATE_LIST.success);
        inp.classList.add(STATE_LIST.error);
        errOutput.classList.add(STATE_LIST.active);
        errOutput.textContent = blankErr;

    } else if (value < 30) {
        inp.classList.remove(STATE_LIST.success);
        inp.classList.add(STATE_LIST.error);
        errOutput.classList.add(STATE_LIST.active);
        errOutput.textContent = minPeriod;

    } else if (value > 365) {
        inp.classList.remove(STATE_LIST.success);
        inp.classList.add(STATE_LIST.error);
        errOutput.classList.add(STATE_LIST.active);
        errOutput.textContent = maxPeriod;

    } else {
        inp.classList.remove(STATE_LIST.error);
        inp.classList.add(STATE_LIST.success);
        errOutput.classList.remove(STATE_LIST.active);
    }

    return value;
}


// * TRANSFER DATA

function transferData(curBtn, obj, newObj, curName, investvalue, periodValue, walletValue, imgPathValue) {
    if (curBtn.getAttribute('data-currency') == curName && curBtn.classList.contains(STATE_LIST.active)) {
        obj.currency = curName;
        obj.amount = investvalue;
        obj.period = periodValue;
        obj.wallet = walletValue;
        obj.imgPath = imgPathValue;

        localStorage.setItem(newObj, JSON.stringify(obj));
    }
}


// * CALL FUNCTIONS

DEPOSIT_NODES.curBtns.forEach((invBtn) => {
    invBtn.addEventListener("click", function (e) {
        selectCurrency(
            e, curBtnsClass, DEPOSIT_NODES.curBtns
        );
    });
});


if (DEPOSIT_NODES.investInp) {
    DEPOSIT_NODES.investInp.addEventListener('input', () => {
        for (btn of DEPOSIT_NODES.curBtns) {

            if (btn.getAttribute('data-currency') == CUR_LIST.bitcoin.name && btn.classList.contains(STATE_LIST.active)) {
                investValue = setInterval(function () {
                    checkLimits(
                        DEPOSIT_NODES.investInp, CUR_LIMITS.bitcoin.min, CUR_LIMITS.bitcoin.amount2, CUR_LIMITS.bitcoin.amount3, CUR_LIMITS.bitcoin.max,
                        DEPOSIT_NODES.investErrOutput, TEXT_ERRORS.bitcoin.minAmount, TEXT_ERRORS.bitcoin.maxAmount, TEXT_ERRORS.blankInp
                    );
                }, 3000);

            } else if (btn.getAttribute('data-currency') == CUR_LIST.ethereum.name && btn.classList.contains(STATE_LIST.active)) {
                investValue = setInterval(function () {
                    checkLimits(
                        DEPOSIT_NODES.investInp, CUR_LIMITS.ethereum.min, CUR_LIMITS.ethereum.amount2, CUR_LIMITS.ethereum.amount3, CUR_LIMITS.ethereum.max,
                        DEPOSIT_NODES.investErrOutput, TEXT_ERRORS.ethereum.minAmount, TEXT_ERRORS.ethereum.maxAmount, TEXT_ERRORS.blankInp
                    );
                }, 3000);
            } else if (btn.getAttribute('data-currency') == CUR_LIST.litecoin.name && btn.classList.contains(STATE_LIST.active)) {
                investValue = setInterval(function () {
                    checkLimits(
                        DEPOSIT_NODES.investInp, CUR_LIMITS.litecoin.min, CUR_LIMITS.litecoin.amount2, CUR_LIMITS.litecoin.amount3, CUR_LIMITS.litecoin.max, DEPOSIT_NODES.investErrOutput, TEXT_ERRORS.litecoin.minAmount, TEXT_ERRORS.litecoin.maxAmount, TEXT_ERRORS.blankInp
                    );
                }, 3000);

            } else if (btn.getAttribute('data-currency') == CUR_LIST.dash.name && btn.classList.contains(STATE_LIST.active)) {
                investValue = setInterval(function () {
                    checkLimits(
                        DEPOSIT_NODES.investInp, CUR_LIMITS.dash.min, CUR_LIMITS.dash.amount2, CUR_LIMITS.dash.amount3, CUR_LIMITS.dash.max, DEPOSIT_NODES.investErrOutput, TEXT_ERRORS.dash.minAmount, TEXT_ERRORS.dash.maxAmount, TEXT_ERRORS.blankInp
                    );
                }, 3000);

            } else if (btn.getAttribute('data-currency') == CUR_LIST.monero.name && btn.classList.contains(STATE_LIST.active)) {
                investValue = setInterval(function () {
                    checkLimits(
                        DEPOSIT_NODES.investInp, CUR_LIMITS.monero.min, CUR_LIMITS.monero.amount2, CUR_LIMITS.monero.amount3, CUR_LIMITS.monero.max, DEPOSIT_NODES.investErrOutput,
                        TEXT_ERRORS.monero.minAmount, TEXT_ERRORS.monero.maxAmount, TEXT_ERRORS.blankInp
                    );
                }, 3000);

            } else if (btn.getAttribute('data-currency') == CUR_LIST.usd.name && btn.classList.contains(STATE_LIST.active)) {
                investValue = setInterval(function () {
                    checkLimits(
                        DEPOSIT_NODES.investInp, CUR_LIMITS.usd.min, CUR_LIMITS.usd.amount2, CUR_LIMITS.usd.amount3, CUR_LIMITS.usd.max, DEPOSIT_NODES.investErrOutput, TEXT_ERRORS.usd.minAmount, TEXT_ERRORS.usd.maxAmount, TEXT_ERRORS.blankInp
                    );
                }, 3000);
            }
        }
    });
}


if (DEPOSIT_NODES.periodInp) {
    DEPOSIT_NODES.periodInp.addEventListener('input', function () {
        periodValue = setInterval(function () {
            checkPeriod(
                DEPOSIT_NODES.periodInp, DEPOSIT_NODES.periodErrOutput, TEXT_ERRORS.period.minInvest, TEXT_ERRORS.period.maxInvest, TEXT_ERRORS.blankInp
            );
        }, 3000);
    });
}


// * REDIRECT ON PAYMENT PAGE

if (DEPOSIT_NODES.formBtn) {
    DEPOSIT_NODES.formBtn.addEventListener('click', function () {
        if (DEPOSIT_NODES.investInp.classList.contains(STATE_LIST.success) && DEPOSIT_NODES.periodInp.classList.contains(STATE_LIST.success)) {
            for (btn of DEPOSIT_NODES.curBtns) {

                // * SAVE TO LOCAL STORAGE
                transferData(
                    btn, transactionData, 'dataRaw', CUR_LIST.bitcoin.name, DEPOSIT_NODES.investInp.value, DEPOSIT_NODES.periodInp.value, WALLETS.bitcoin, IMG_PATHS.bitcoin
                );

                transferData(
                    btn, transactionData, 'dataRaw', CUR_LIST.ethereum.name, DEPOSIT_NODES.investInp.value, DEPOSIT_NODES.periodInp.value, WALLETS.ethereum, IMG_PATHS.ethereum
                );

                transferData(
                    btn, transactionData, 'dataRaw', CUR_LIST.litecoin.name, DEPOSIT_NODES.investInp.value, DEPOSIT_NODES.periodInp.value, WALLETS.litecoin, IMG_PATHS.litecoin
                );

                transferData(
                    btn, transactionData, 'dataRaw', CUR_LIST.dash.name, DEPOSIT_NODES.investInp.value, DEPOSIT_NODES.periodInp.value, WALLETS.dash, IMG_PATHS.dash
                );

                transferData(
                    btn, transactionData, 'dataRaw', CUR_LIST.monero.name, DEPOSIT_NODES.investInp.value, DEPOSIT_NODES.periodInp.value, WALLETS.monero, IMG_PATHS.monero
                );

                transferData(
                    btn, transactionData, 'dataRaw', CUR_LIST.usd.name, DEPOSIT_NODES.investInp.value, DEPOSIT_NODES.periodInp.value, WALLETS.usd, IMG_PATHS.usd
                );
            }
            DEPOSIT_NODES.formBtn.setAttribute('href', pageAddress);

        } else {
            DEPOSIT_NODES.formBtn.setAttribute('href', '');
        }
    });
}

// ! PAYMENT PAGE FUNCTIONALITY

// * TIMER

let time = 1800;

function timeCount() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    time--;

    PAY_NODES.timeOutput.textContent = `${minutes} m ${seconds} s`;
}

if (PAY_NODES.timeOutput) {
    timeCount();
    setInterval(timeCount, 1000);
}

// * DATA TRANSFER

let dataRaw = JSON.parse(localStorage.getItem('dataRaw'));

function setCreditails() {
    PAY_NODES.curOutput.textContent = dataRaw.currency;
    PAY_NODES.amountOutput.textContent = dataRaw.amount;
    PAY_NODES.periodOutput.textContent = dataRaw.period;

    PAY_NODES.curOutput2.textContent = dataRaw.currency;
    PAY_NODES.amountOutput2.value = dataRaw.amount;
    PAY_NODES.walletOutput.value = dataRaw.wallet;
    PAY_NODES.qrCode.setAttribute('src', dataRaw.imgPath);

    // * Generate random string
    let randomStr = new RandExp(/[0-9]{8}/).gen();
    PAY_NODES.invoiceId.textContent = randomStr;

    localStorage.clear();
}

if (PAY_NODES.walletOutput) {
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

copyData(PAY_NODES.copyAmount, PAY_NODES.amountOutput2, PAY_NODES.amountTooltip);
copyData(PAY_NODES.copyAddress, PAY_NODES.walletOutput, PAY_NODES.addressTooltip);