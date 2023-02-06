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
    formBtn: document.getElementById('deposit-btn'),
    tariffOutput: document.getElementById("tariff-output"),
}

// * Payments nodes
const PAY_NODES = {
    curOutput: document.getElementById('pay-currency-output'),
    amountOutput: document.getElementById('pay-amount-output'),
    periodOutput: document.getElementById('pay-period-output'),
    tariffOutput: document.getElementById("pay-tariff-output"),
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
    payBtn: document.getElementById("pay-btn"),
    modal: document.getElementById("pay-modal"),
}

const TARIFF_NAMES = {
    first: "STARTER",
    second: "ADVANCED",
    third: "PROFFESSIONAL",
}

// * TRANSACTION INFO
let transactionData = {
    currency: "",
    amount: "",
    period: "",
    wallet: "",
    imgPath: "",
    tariff: "",
};

let validInterval = 2000;
let time = 1800;            // in seconds
let storageName = 'dataRaw';


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

// * Reduse num after comma
function setDecimalNumber(inp, num) {
    // цифра устанавливает количество цифр после запятой, т.е. если 3, то максимум 2 цифры после запятой
    if (inp.value.indexOf(".") != '-1') {
        inp.value = inp.value.substring(0, inp.value.indexOf(".") + num);
    }
}

// * CHECK CUR LIMITS
function checkLimits(
    inp, errOutput, { min, max }, { minAmount, maxAmount }, blankErr
) {
    let value = +inp.value;

    if (value == '') {
        inp.classList.remove(STATE_LIST.success);
        inp.classList.add(STATE_LIST.error);
        errOutput.classList.add(STATE_LIST.active);
        errOutput.textContent = blankErr;

    } else if (value < min) {
        inp.classList.remove(STATE_LIST.success);
        inp.classList.add(STATE_LIST.error);
        errOutput.classList.add(STATE_LIST.active);
        errOutput.textContent = minAmount;

    } else if (value >= min && value <= max) {
        inp.classList.remove(STATE_LIST.error);
        inp.classList.add(STATE_LIST.success);
        errOutput.classList.remove(STATE_LIST.active);
    } else {
        inp.classList.remove(STATE_LIST.success);
        inp.classList.add(STATE_LIST.error);
        errOutput.classList.add(STATE_LIST.active);
        errOutput.textContent = maxAmount;
    }

    return value;
}

// * CHECK PERIOD
function checkPeriod(
    inp, errOutput, { minInvest, maxInvest }, blankErr
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
        errOutput.textContent = minInvest;

    } else if (value > 365) {
        inp.classList.remove(STATE_LIST.success);
        inp.classList.add(STATE_LIST.error);
        errOutput.classList.add(STATE_LIST.active);
        errOutput.textContent = maxInvest;

    } else {
        inp.classList.remove(STATE_LIST.error);
        inp.classList.add(STATE_LIST.success);
        errOutput.classList.remove(STATE_LIST.active);
    }

    return value;
}

function checkTariff(
    inp, output, { min, amount2, amount3, max }
) {
    let value = +inp.value;

    if (value >= min && value < amount2) {
        transactionData.tariff = TARIFF_NAMES.first;
        output.textContent = TARIFF_NAMES.first;
    } else if (value >= amount2 && value <= amount3) {
        transactionData.tariff = TARIFF_NAMES.second;
        output.textContent = TARIFF_NAMES.second;
    } else if (value > amount3 && value <= max) {
        transactionData.tariff = TARIFF_NAMES.third;
        output.textContent = TARIFF_NAMES.third;
    } else {
        transactionData.tariff = "-";
        output.textContent = "-";
    }
}

// * TRANSFER DATA
function transferData(curBtn, obj, newObj, curName, investvalue, periodValue, walletValue, imgPathValue, tariffValue) {
    if (curBtn.getAttribute('data-currency') == curName && curBtn.classList.contains(STATE_LIST.active)) {
        obj.currency = curName;
        obj.amount = investvalue;
        obj.period = periodValue;
        obj.wallet = walletValue;
        obj.imgPath = imgPathValue;
        obj.tariff = tariffValue;

        localStorage.setItem(newObj, JSON.stringify(obj));
    }
}

// * Return condition using in call
function getCurBtnCond(btn, curName, state) {
    return btn.getAttribute('data-currency') == curName && btn.classList.contains(state);
}

// * Complete check
function checkOptions(btn) {
    if (
        getCurBtnCond(btn, CUR_LIST.bitcoin.name, STATE_LIST.active)
    ) {
        investValue = checkLimits(
            DEPOSIT_NODES.investInp,
            DEPOSIT_NODES.investErrOutput,
            CUR_LIMITS.bitcoin,
            TEXT_ERRORS.bitcoin,
            TEXT_ERRORS.blankInp
        );
        checkTariff(
            DEPOSIT_NODES.investInp,
            DEPOSIT_NODES.tariffOutput,
            CUR_LIMITS.bitcoin
        );
        return investValue;
    } else if (
        getCurBtnCond(btn, CUR_LIST.ethereum.name, STATE_LIST.active)
    ) {
        investValue = checkLimits(
            DEPOSIT_NODES.investInp,
            DEPOSIT_NODES.investErrOutput,
            CUR_LIMITS.ethereum,
            TEXT_ERRORS.ethereum,
            TEXT_ERRORS.blankInp
        );
        checkTariff(
            DEPOSIT_NODES.investInp,
            DEPOSIT_NODES.tariffOutput,
            CUR_LIMITS.ethereum
        );
        return investValue;
    } else if (
        getCurBtnCond(btn, CUR_LIST.litecoin.name, STATE_LIST.active)
    ) {
        investValue = checkLimits(
            DEPOSIT_NODES.investInp,
            DEPOSIT_NODES.investErrOutput,
            CUR_LIMITS.litecoin,
            TEXT_ERRORS.litecoin,
            TEXT_ERRORS.blankInp
        );
        checkTariff(
            DEPOSIT_NODES.investInp,
            DEPOSIT_NODES.tariffOutput,
            CUR_LIMITS.litecoin
        );
        return investValue;
    } else if (
        getCurBtnCond(btn, CUR_LIST.dash.name, STATE_LIST.active)
    ) {
        investValue = checkLimits(
            DEPOSIT_NODES.investInp,
            DEPOSIT_NODES.investErrOutput,
            CUR_LIMITS.dash,
            TEXT_ERRORS.dash,
            TEXT_ERRORS.blankInp
        );
        checkTariff(
            DEPOSIT_NODES.investInp,
            DEPOSIT_NODES.tariffOutput,
            CUR_LIMITS.dash
        );
        return investValue;
    } else if (
        getCurBtnCond(btn, CUR_LIST.monero.name, STATE_LIST.active)
    ) {
        investValue = checkLimits(
            DEPOSIT_NODES.investInp,
            DEPOSIT_NODES.investErrOutput,
            CUR_LIMITS.monero,
            TEXT_ERRORS.monero,
            TEXT_ERRORS.blankInp
        );
        checkTariff(
            DEPOSIT_NODES.investInp,
            DEPOSIT_NODES.tariffOutput,
            CUR_LIMITS.monero
        );
        return investValue;
    } else if (
        getCurBtnCond(btn, CUR_LIST.usd.name, STATE_LIST.active)
    ) {
        investValue = checkLimits(
            DEPOSIT_NODES.investInp,
            DEPOSIT_NODES.investErrOutput,
            CUR_LIMITS.usd,
            TEXT_ERRORS.usd,
            TEXT_ERRORS.blankInp
        );
        checkTariff(
            DEPOSIT_NODES.investInp,
            DEPOSIT_NODES.tariffOutput,
            CUR_LIMITS.usd
        );
        return investValue;
    }
}

// * Count calling f(x)
function counter(originalFunc) {
    const fun = function (...args) {
        args
            .filter((v, i, a) => a.indexOf(v) === i)
            .forEach((v) => fun.counts[v] = (fun.counts[v] ?? 0) + 1);
        return originalFunc(...args);
    }
    fun.counts = {};
    fun.totalRun = (arg) => fun.counts[arg] ?? 0;
    return fun;
}

// * CALL FUNCTIONS

// * Add method totalRun from counter to checkOptions
const checkCounter = counter(checkOptions);
let callCount = 0;

for (btn of DEPOSIT_NODES.curBtns) {
    btn.addEventListener("click", function (e) {
        selectCurrency(
            e, curBtnsClass, DEPOSIT_NODES.curBtns
        );
        callCount += checkCounter.totalRun(this);
        if (callCount > 1) {
            checkCounter(this);
        }
    });
}

if (DEPOSIT_NODES.investInp) {
    DEPOSIT_NODES.investInp.addEventListener('input', function () {
        setDecimalNumber(this, 8);

        setTimeout(() => {
            for (btn of DEPOSIT_NODES.curBtns) {
                checkCounter(btn);
            }
        }, validInterval);
    });
}

if (DEPOSIT_NODES.periodInp) {
    DEPOSIT_NODES.periodInp.addEventListener('input', function () {
        setDecimalNumber(this, 1);

        periodValue = setTimeout(() => {
            checkPeriod(
                this,
                DEPOSIT_NODES.periodErrOutput,
                TEXT_ERRORS.period,
                TEXT_ERRORS.blankInp
            );
        }, validInterval);
    });
}

// * REDIRECT ON PAYMENT PAGE
if (DEPOSIT_NODES.formBtn) {
    DEPOSIT_NODES.formBtn.addEventListener('click', function () {
        if (
            DEPOSIT_NODES.investInp.classList.contains(STATE_LIST.success) &&
            DEPOSIT_NODES.periodInp.classList.contains(STATE_LIST.success
            )) {
            for (btn of DEPOSIT_NODES.curBtns) {
                transferData(
                    btn,
                    transactionData,
                    storageName,
                    CUR_LIST.bitcoin.name,
                    DEPOSIT_NODES.investInp.value,
                    DEPOSIT_NODES.periodInp.value,
                    WALLETS.bitcoin,
                    IMG_PATHS.bitcoin,
                    transactionData.tariff,
                );
                transferData(
                    btn,
                    transactionData,
                    storageName,
                    CUR_LIST.ethereum.name,
                    DEPOSIT_NODES.investInp.value,
                    DEPOSIT_NODES.periodInp.value,
                    WALLETS.ethereum,
                    IMG_PATHS.ethereum,
                    transactionData.tariff,
                );
                transferData(
                    btn,
                    transactionData,
                    storageName,
                    CUR_LIST.litecoin.name,
                    DEPOSIT_NODES.investInp.value,
                    DEPOSIT_NODES.periodInp.value,
                    WALLETS.litecoin,
                    IMG_PATHS.litecoin,
                    transactionData.tariff,
                );
                transferData(
                    btn,
                    transactionData,
                    storageName,
                    CUR_LIST.dash.name,
                    DEPOSIT_NODES.investInp.value,
                    DEPOSIT_NODES.periodInp.value,
                    WALLETS.dash,
                    IMG_PATHS.dash,
                    transactionData.tariff,
                );
                transferData(
                    btn,
                    transactionData,
                    storageName,
                    CUR_LIST.monero.name,
                    DEPOSIT_NODES.investInp.value,
                    DEPOSIT_NODES.periodInp.value,
                    WALLETS.monero,
                    IMG_PATHS.monero,
                    transactionData.tariff,
                );
                transferData(
                    btn,
                    transactionData,
                    storageName,
                    CUR_LIST.usd.name,
                    DEPOSIT_NODES.investInp.value,
                    DEPOSIT_NODES.periodInp.value,
                    WALLETS.usd,
                    IMG_PATHS.usd,
                    transactionData.tariff,
                );
            }
            DEPOSIT_NODES.formBtn.parentElement.setAttribute('action', pageAddress);

        } else {
            DEPOSIT_NODES.formBtn.parentElement.setAttribute('action', '');
        }
    });
}

// ! PAYMENT PAGE FUNCTIONALITY

// * TIMER
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
function getId() {
    return Math.floor(Math.random() * 10000000);
}

let dataRaw = JSON.parse(localStorage.getItem(storageName));

function setCreditails() {
    PAY_NODES.curOutput.textContent = dataRaw.currency;
    PAY_NODES.amountOutput.textContent = dataRaw.amount;
    PAY_NODES.periodOutput.textContent = dataRaw.period;
    PAY_NODES.tariffOutput.textContent = dataRaw.tariff;

    PAY_NODES.curOutput2.textContent = dataRaw.currency;
    PAY_NODES.amountOutput2.value = dataRaw.amount;
    PAY_NODES.walletOutput.value = dataRaw.wallet;
    PAY_NODES.qrCode.setAttribute('src', dataRaw.imgPath);
    PAY_NODES.invoiceId.textContent = getId();

    localStorage.clear();
}

if (dataRaw) {
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

copyData(
    PAY_NODES.copyAmount,
    PAY_NODES.amountOutput2,
    PAY_NODES.amountTooltip
);
copyData(
    PAY_NODES.copyAddress,
    PAY_NODES.walletOutput,
    PAY_NODES.addressTooltip
);

// * MODAL

const MODAL_CLASSES = {
    ROOT: "modal",
    DIALOG_BODY: "modal__dialog-body",
    TRIGGER_OPEN: "modal-open",
    TRIGGER_CLOSE: "modal-close"
};

document.addEventListener("click", (e) => {
    //  open
    if (e.target.closest(`.${MODAL_CLASSES.TRIGGER_OPEN}`)) {
        e.preventDefault();

        const target = e.target.closest(`.${MODAL_CLASSES.TRIGGER_OPEN}`);
        const modalID = target.getAttribute("href").replace("#", "");
        const modal = document.getElementById(modalID);
        modal.classList.add(STATE_LIST.active);

        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
        document.body.style.overflow = "hidden";
    }
    // close
    if (
        e.target.closest(`.${MODAL_CLASSES.TRIGGER_CLOSE}`) ||
        e.target.classList.contains(STATE_LIST.active)
    ) {
        e.preventDefault();
        const modal = e.target.closest(`.${MODAL_CLASSES.ROOT}`);
        modal.classList.remove(STATE_LIST.active);
        
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0px";
    }
});

const getScrollbarWidth = () => {
    const item = document.createElement("div");

    item.style.position = "absolute";
    item.style.top = "-9999px";
    item.style.width = "50px";
    item.style.height = "50px";
    item.style.overflow = "scroll";
    item.style.visibility = "hidden";

    document.body.appendChild(item);

    // * Calc scroll width
    const scrollBarWidth = item.offsetWidth - item.clientWidth;
    document.body.removeChild(item);
    return scrollBarWidth;
};