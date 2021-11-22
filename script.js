let bill = 0;
let people = 0;
let tip = 0;
let total = 0;
let currentTip = '15';
const startButton = document.getElementById('15');
const billInput = document.getElementById('bill-input');
const peopleInput = document.getElementById('people-input');
const buttons = document.querySelectorAll('button');
const customButton = document.getElementsByClassName('tip-btns-custom');
const totalOutput = document.getElementById('total-person');
const tipOutput = document.getElementById('total-tip-person');
const cannotBeZeroBill = document.getElementById('cannot-be-zero-bill');
const cannotBeZeroPeople = document.getElementById('cannot-be-zero-people');

startButton.classList.add('tip-btns-btn-active');

billInput.addEventListener('input', setBillValue);
billInput.addEventListener('input', () => {
    if (billInput.value === '0') {
        cannotBeZeroBill.style.display = "block";
        billInput.style.borderColor = "orange";
        billInput.value = ``;
    } else {
        cannotBeZeroBill.style.display = "none";
        billInput.style.borderColor = "";
        if (people !== 0) {
            calc();
            nanChecker();
        }
    }
});
peopleInput.addEventListener('input', setPeopleValue);
peopleInput.addEventListener('input', () => {
    if (peopleInput.value === '0') {
        cannotBeZeroPeople.style.display = "block";
        peopleInput.style.borderColor = "orange";
        peopleInput.value = ``;
    } else {
        cannotBeZeroPeople.style.display = "none";
        peopleInput.style.borderColor = "";
        if (bill !== 0) {
            calc();
            nanChecker();
        }
    }
});

customButton[0].addEventListener('click', () => {
    clearBtns();
    customButton[0].classList.add('tip-btns-custom-active');
});

customButton[0].addEventListener('input', () => {
    const custom = customButton[0].value;
    currentTip = custom;
    if (bill !== 0 && people !== 0) {
        calcCustom(custom);
        nanChecker();
    }
});

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.id === 'reset-btn') {
            clearBtns();
            reset();
        } else {
            currentTip = e.target.id;
            calc();
            clearBtns();
            button.classList.add('tip-btns-btn-active');
            nanChecker();
        }
    });
});

function clearBtns() {
    customButton[0].value = '';
    customButton[0].classList.remove('tip-btns-custom-active');

    buttons.forEach((button) => {
        button.classList.remove('tip-btns-btn-active');
    });
};

function setBillValue() {
    bill = parseFloat(billInput.value);
};

function setPeopleValue() {
    people = parseFloat(peopleInput.value);
};

function calc() {
    total = bill / people;
    tip = (parseFloat(currentTip) / 100) * total;
    total = total + tip;
    tip = tip.toFixed(2);
    total = total.toFixed(2);
    totalOutput.textContent = `${total}$`;
    tipOutput.textContent = `${tip}$`;
};

function calcCustom(e) {
    total = bill / people;
    tip = (parseFloat(e) / 100) * total;
    total = total + tip;
    tip = tip.toFixed(2);
    total = total.toFixed(2);
    totalOutput.textContent = `${total}$`;
    tipOutput.textContent = `${tip}$`;
}

function nanChecker() {
    if (total === 'NaN' || tip === NaN) {
        totalOutput.textContent = `0.00$`;
        tipOutput.textContent = `0.00$`;
    }
};

function reset() {
    bill = 0;
    people = 0;
    tip = 0;
    total = 0;
    billInput.value = ``;
    peopleInput.value = ``;
    totalOutput.textContent = `0.00$`;
    tipOutput.textContent = `0.00$`;
    currentTip = '15';
    startButton.classList.add('tip-btns-btn-active');
}
