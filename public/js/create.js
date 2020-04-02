let sfloorNumber;
let floorNumber;

window.onload = () => {

    const sfloor = document.getElementById('sfloor');
    const floorAddBtn = document.getElementById('floorAddBtn');
    const floorRemoveBtn = document.getElementById('floorRemoveBtn');
    const submitBtn = document.getElementById('submitBtn');

    sfloorNumber = Number(sfloor.options[sfloor.selectedIndex].value) || 1;
    floorNumber = sfloorNumber || 1;

    sfloor.addEventListener('change', sfloorOptionHandler);
    floorAddBtn.addEventListener('click', floorAddBtnHandler);
    floorRemoveBtn.addEventListener('click', floorRemoveBtnHandler);
    submitBtn.addEventListener('click', submitBtnHandler);
    refresh();
}

const sfloorOptionHandler = () => {
    const floorDiv = document.getElementById('floorDiv');
    floorDiv.innerHTML = '';
    sfloorNumber = Number(sfloor.options[sfloor.selectedIndex].value) || 1;
    floorNumber = sfloorNumber || 1;
    refresh();
}

const rename = (floorNumber) => {
    return floorNumber < 0 ? `지하 ${-floorNumber}` : floorNumber; 
}

const getNextFloor = (floorNumber) => {
    return floorNumber == -1 ? floorNumber + 2 : floorNumber + 1
}

const getPreviousFloor = (floorNumber) => {
    return floorNumber == 1 ? floorNumber - 2 : floorNumber - 1
}

const refresh = () => {

    const floorAddSpan = document.getElementById('floorAddSpan');
    const floorRemoveSpan = document.getElementById('floorRemoveSpan');

    if (floorNumber <= sfloorNumber) {
        floorRemoveBtn.style.display = 'none';
    }
    else {
        floorRemoveBtn.style.display = '';
    }

    floorAddBtn.scrollIntoView();
    floorAddSpan.innerHTML = rename(floorNumber);
    floorRemoveSpan.innerHTML = rename(getPreviousFloor(floorNumber));
}


const floorAddBtnHandler = () => {
    const floorDiv = document.getElementById('floorDiv');
    
    floorDiv.innerHTML += `
        <div class="form-control floor" style="border:solid 0.5px #a1a1a1;border-radius:5px;padding:2vw 7vw" id=${floorNumber}>
            <div class="floor-control">
                <h2>${rename(floorNumber)}층</h2>

                <div>
                    <label for="bunyang">분양여부</label>
                    <select name="bunyang" id="${floorNumber}floor-bunyang">
                        <option value="분양중" selected="selected">분양중</option>
                        <option value="임대가능">임대가능</option>
                        <option value="분양완료">분양완료</option>
                        <option value="미분양">미분양</option>
                    </select>
                </div>

                <div>
                    <label for="price">분양가</label>
                    <input type="text" name="floor-price" id="${floorNumber}floor-price" placeholder="미정">
                </div>
                
                <div>
                    <label for="imageUrl">평면도</label>
                    <input type="text" name="imageUrl" id="${floorNumber}floor-imageUrl" placeholder="이미지 링크">
                </div>
            </div>
        </div>

        </div>
    `;
    floorNumber = getNextFloor(floorNumber);
    refresh();
}

const floorRemoveBtnHandler = () => {
    floorNumber = getPreviousFloor(floorNumber);
    document.getElementById(floorNumber).remove();
    refresh();
}

const submitBtnHandler = () => {

    const answer = confirm("저장하시겠습니까?");
    if (!answer) {
        return;
    }
    const city = document.getElementById('city');
    const data = {
        name: document.getElementById('title').value,
        address: document.getElementById('address').value,
        city: city.options[city.selectedIndex].value,
        imageUrl: document.getElementById('buildingImageUrl').value,
        information: Array.from(document.querySelectorAll('.floor')).map((floor)=>{
            const floorId = floor.getAttribute('id');
            const bunyang = document.getElementById(`${floorId}floor-bunyang`);
            return {
                floorNumber: floorId,
                price: document.getElementById(`${floorId}floor-price`).value,
                bunyang: bunyang.options[bunyang.selectedIndex].value,
                imageUrl: document.getElementById(`${floorId}floor-imageUrl`).value
            }
        })
    };

    (async () => {
        try {
            document.querySelector('.loader').classList.add('is-active');
            let response = await fetch('/admin/building', {
                method: 'POST',
                body: JSON.stringify(data), 
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            response = await response.json();
            console.log(response);
            if (response.result === 'success') {
                window.location.href = `http://localhost:3000/${response.city}`;
            } else {
                alert("저장에 실패했습니다.!");
            }
        } catch (err) {
            console.log(err);
            alert("저장에 실패했습니다.!");
        } finally {
            document.querySelector('.loader').classList.remove('is-active');
        }
    })();
}