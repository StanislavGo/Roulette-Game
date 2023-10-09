/**
 * 1. При кліку на кнопку "Почати"
 *      1.1. Зробити кнопку неактивной - done
 *      1.2. Вставити патрон в барабан - done
 *      1.3. Почати крутити барабан
 *      1.4. Сховати пулю
 *      1.5. Брать випадкове число, яке буде відповідати за місце пулі в барабані
 *      1.6. Відобразити Револьвер - done
 *      1.7. Змінити текст кнопки на "Зробити постріл" - done
 *      1.8. Зробити кнопку активною - done
 * 2. При кліці по кнопці "Зробити постріл"
 *      2.1. Перевіряти число пострілу - done
 *      2.2. Якщо куля совпаде числу кулі в барабані, то робити постріл в персонажа - done
 *      2.3. Інакше ревельвер перевертається і повторюється пункт 2 - done
 *      2.4. При успішному пострілі додати кров
 *      2.5. Прокрутити барабан
 * 3. При завершенні гри
 *      3.1. Міняти текст кнопки на "Рестарт" - done
 *      3.2. При кліці на цю кнопку перезавантажувати вікно
 */

let countShot = 0;
let bulletPosition = random(1, 6);
let bntShot = document.querySelector('#shot');
let currentPlayer = 1;
let baraban = document.querySelector('#baraban');

bntShot.onclick = start;

// Перший клік по кнопці "начать"
function start() {
    bntShot.className = 'off';
    let bullet = document.querySelector('#bullet');
    bullet.style.display = "block";
    let revolver = document.querySelector('#revolver');
    revolver.style.display = 'block';

    setTimeout(function() {

    }, 1000)
    bntShot.onclick = '';
    let rotate = 0;
    let timer = setInterval(function() {
        rotate = rotate + 10;
        baraban.style.transform = "rotate(" + rotate + "deg)";
        if(rotate > 320) {
            bullet.style.background = "none";
        }
        if(rotate == 720) {
            clearInterval(timer);
            bntShot.innerText = 'Зробити постріл';
            bntShot.onclick = shot;
            bntShot.className = '';
        }
    }, 16)
}

// Функція яка вибирає рандомне число
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let rotateBaraban = 0;

/**
 * 1. Якщо позиція кулі == числу пострілу, то стреляти і додавати кров на картинку того, в кого стрельнуло
 * 2. Повертає пістлет в ліво і право
 * 3. При кожному кліку по кнопці "Зробити постріл" перевертати на 60 градусів барабан
 */
function shot() {
    countShot++;
    if(bulletPosition == countShot) {
        endGame();
        let blood = document.createElement('div');
        blood.id = 'blood';
        let player = document.querySelector('#player' + currentPlayer);
        player.appendChild(blood);
    } else{
        if(currentPlayer == 1) {
            rotationRight();
            currentPlayer = 2;
        } else {
            rotationLeft();
            currentPlayer = 1;
        }
        rotateBaraban = rotateBaraban + 60;
        let rotate = rotateBaraban;
        let timer = setInterval(function() {
            rotate = rotate + 10;
            baraban.style.transform = 'rotate(' + rotate + 'deg)';
            if(rotate == rotateBaraban + 60) {
                clearInterval(timer);
                rotateBaraban = rotate;
            }
        }, 10)
    }
}

let revolver = document.querySelector('#revolver');

function rotationRight() {
    revolver.style.background = 'url("images/revolver-right.png") no-repeat';
}
rotationRight();

function rotationLeft() {
    revolver.style.background = 'url("images/revolver-left.png") no-repeat';
}
rotationLeft();

function endGame() {
    bntShot.innerText = 'Рестарт';
    bntShot.onclick = restart;
}

function restart() {
    location.reload();
}