const numObject = [
    { name: 'Airtel', prefix: ['0701', '0708', '0802', '0808', '0812', '0901', '0902', '0904', '0907'] },
    { name: 'MTN', prefix: ['07025', '07026', '0703', '0704', '0706', '0803', '0806', '0810', '0813', '0814', '0816', '0906', '0913'] },
    { name: 'Globacom', prefix: ['0705', '0805', '0807', '0811', '0815', '0905', '0915'] },
    { name: 'Smile', prefix: ['07020'] },
    { name: 'Starcoms', prefix: ['07028', '07029'] },
    { name: 'ZoomMobile', prefix: ['0707'] },
    { name: 'Ntel', prefix: ['0804'] },
    { name: '9Mobile', prefix: ['0809', '0817', '0818', '0909', '0908'] }
]


const inputNum = document.querySelector('#num-input');
const output = document.querySelector('#output');

let arr = [];
let prefixStore;
let netName;
let netNum;
let netWorkNum;

const ans = numObject.forEach((a) => {
    arr.push(a.prefix)
    return arr;
})


inputNum.addEventListener('keyup', () => {
    let num = inputNum.value;
    document.getElementById('output').innerHTML = '<div>' + inputNum.value + '</div>';
    if (num.length === 4) {
        check(num)
        prefixStore = check(num);
        netWorkNum = getName(prefixStore);
        netName = netWorkNum;
    }
    if (num.length === 5) {
        if (check(num) == 'Not a valid phone number') {
            let networkName = getName(prefixStore);
            if (!networkName) return document.getElementById('message').innerHTML = 'Not a valid phone number';
            else {
                return document.getElementById('message').innerHTML = networkName;
            }
        }
    }

    if (num.length === 11) {
        netNum = num;
        document.querySelector('.button').style.display = 'block';
        valPrefix = document.querySelector('#val-prefix').innerHTML;
        const otherNumbers = num.replace(valPrefix, '');
        document.getElementById('val-other-number').innerHTML = otherNumbers;
    }
});

function check(num) {
    let integer = num;
    let body = document.querySelector('body');
    const search = arr.flat().filter(element => {
        if (integer === element) {
            return 'yes';
        } else {
            return false;
        }
    })

    if (!search[0]) {
        return document.getElementById('message').innerHTML = 'Not a valid phone number';
    } else {
        document.getElementById('message').innerHTML = getName(search[0]);
        document.getElementById('val-prefix').innerHTML = search[0];
        body.classList.add('fade');
        return search[0];
    }

}

const getName = (strNum) => {
    let name;
    numObject.filter((object) => {
        if (object.prefix.includes(strNum)) {
            name = object.name;
        }
    });
    return name;
}

document.querySelector('.button').addEventListener('click', () => {
    if (document.querySelector('#message').innerHTML === 'Not a valid phone number') {
        let errorAudio = new Audio('file:///C:/Users/USER/Music/nasty-error-long-366.mp3');
        errorAudio.play();
        document.querySelector('.modal-container').style.display = 'flex';
        document.querySelector('.modal-container').innerHTML = `
        <div class="modal">
            <p>You have an</p>
            <h4>Invalid Number</h4>
            <P></P>
            <i class="fa fa-times-circle" aria-hidden="true"></i>
        </div>
        `;
    } else {
        let audio = new Audio('file:///C:/Users/USER/Music/pristine-609.mp3');
        audio.play();
        document.querySelector('.modal-container').style.display = 'flex';
        document.querySelector('.modal-container').innerHTML = `
        <div class="modal">
            <p>Your ${netName} number</p>
            <h4>${netNum}</h4>
            <P>is verified</P>
            <i class="fa fa-check-circle" aria-hidden="true"></i>
        </div>
        `;
    }
});

document.querySelector('.modal-container').addEventListener('click', () => {
    document.querySelector('.modal-container').style.display = 'none';
})
