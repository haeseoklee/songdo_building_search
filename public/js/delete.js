window.onload = () => {
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    Array.from(deleteBtns).reduce((acc, btn) => {
        btn.addEventListener('click', deleteBtnClickHandler);
    }, [])
}

const deleteBtnClickHandler = (e) => {

    const answer = confirm("삭제하시겠습니까?");
    if (!answer) {
        return;
    }

    const buildingId = e.target.getAttribute('id');

    const data = {
        buildingId: buildingId
    };

    (async () => {
        document.querySelector('.loader').classList.add('is-active');
        try {
            let response = await fetch(`/admin/building`, {
                method: 'DELETE',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response = await response.json();
            if (response.result === 'success') {
                document.getElementById(`building-${buildingId}`).remove();
            } else {
                alert("삭제에 실패했습니다.!");
            }
        } catch (err) {
            console.log(err);
        }
        document.querySelector('.loader').classList.remove('is-active');
    })();
}