
const alphabetBig = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О',
    'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х','Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', ];

const alphabetSmall = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н',
    'о', 'п', 'р', 'с', 'т', 'у', 'ф','х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];



function caesarCoder(text, offset) {
    let result = '';
    if (offset < 0 && offset >= -32){
        offset += alphabetSmall.length
    } else if (offset == 33){
        result = 'Недопустимое смещение кода. Результат будет равен вводимому тексту. Шифрование не может быть выполнено!';
        return result
    } else if (offset < -32 || offset > 33) {
        result = 'Недопустимое смещение кода. Значение за пределами допустимого. Шифрование не может быть выполнено!';
        return result
    }
    for(let i in text) {
        if(alphabetBig.includes(text[i])){
            let index = alphabetBig.indexOf(text[i]);
            if ((index +offset) < alphabetBig.length){
                result += alphabetBig[index +offset];
            } else {
                result += alphabetBig[index +offset - alphabetBig.length];
            }
        } else if (alphabetSmall.includes(text[i])) {
            let index = alphabetSmall.indexOf(text[i]);
            if ((index +offset) < alphabetSmall.length){
                result += alphabetSmall[index +offset];
            } else {
                result += alphabetSmall[index +offset - alphabetSmall.length];
            }
        } else {
            result += text[i];
        }
    }
    return result
}

function caesarDecoder(text, offset) {
    let result = '';
    if (offset < 0 && offset >= -32) {
        offset += alphabetSmall.length
    } else if (offset == 33) {
        result = 'Недопустимое смещение кода. Результат будет равен вводимому тексту. Дешифрование не может быть выполнено!';
        return result
    } else if (offset < -32 || offset > 33) {
        result = 'Недопустимое смещение кода. Значение за пределами допустимого. Дешифрование не может быть выполнено!';
        return result
    }
    for (let i in text) {
        if (alphabetBig.includes(text[i])) {
            let index = alphabetBig.indexOf(text[i]) - offset;
            if (index >= 0){
                result += alphabetBig[index];
            } else {
                result += alphabetBig[index + alphabetBig.length];
            }
        } else if (alphabetSmall.includes(text[i])) {
            let index = alphabetSmall.indexOf(text[i]) - offset;
            if (index >= 0) {
                result += alphabetSmall[index];
            } else {
                result += alphabetSmall[alphabetSmall.length + index];
            }
        } else {
            result += text[i];
        }
    }
    return result
}

const textCode = document.getElementById('textCode');
const offset = document.getElementById('offset');
const coding = document.getElementById('coding');
const resultCode = document.getElementById('resultCode');

const textDecode = document.getElementById('textDecode');
const offsetDecode = document.getElementById('offsetDecode');
const decoding = document.getElementById('decoding');
const resultDecode = document.getElementById('resultDecode');

function removeInner(id){
    let elem = document.getElementById(id);
    if(elem.classList.contains('error_input')){
        elem.classList.remove('error_input');
        elem.value = '';
    }
}

coding.addEventListener("click", () => {
    resultCode.classList.remove('good_result');
    resultCode.innerHTML='';
    let offsetValue = Number(offset.value)
    if(!(offsetValue instanceof Number) && isNaN(offsetValue)){
        offset.value = 'Не допустимое значение смещения кода!'
        offset.classList.add('error_input')
        return;
    } else if (!offsetValue) {
        offset.value = 'Значение смещения кода не может быть пустым или равным нулю!'
        offset.classList.add('error_input')
        return;
    }
    if (textCode.value == '') {
        textCode.value = "Не забудьте ввести текст!";
        textCode.classList.add('error_input');
    }  else {
        resultCode.innerHTML = caesarCoder(textCode.value, offsetValue);
        resultCode.classList.add('good_result')
    }

})

decoding.addEventListener("click", () => {
    resultDecode.classList.remove('good_result');
    resultDecode.innerHTML='';
    let offsetDecodeValue = Number(offsetDecode.value)
    if(!(offsetDecodeValue instanceof Number) && isNaN(offsetDecodeValue)){
        offsetDecode.value = 'Не допустимое значение смещения кода!'
        offsetDecode.classList.add('error_input')
        return;
    } else if (!offsetDecodeValue) {
        offsetDecode.value = 'Значение смещения кода не может быть пустым или равным нулю!'
        offsetDecode.classList.add('error_input')
        return;
    }
    if (textDecode.value == '') {
        textDecode.value = "Не забудьте ввести текст!";
        textDecode.classList.add('error_input');
    }  else {
        resultDecode.innerHTML = caesarDecoder(textDecode.value, offsetDecodeValue);
        resultDecode.classList.add('good_result')
    }

})

