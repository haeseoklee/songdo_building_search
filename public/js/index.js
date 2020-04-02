window.onload = () => {
    const buildings = document.querySelectorAll('.img');
    Array.from(buildings).reduce((acc, building) => {
        building.addEventListener('click', () => {
            document.querySelector('.loader').classList.add('is-active');
        });
    }, []);
}