window.onload = () => {
    const buildings = document.querySelectorAll('.building');
    Array.from(buildings).reduce((acc, building) => {
        building.addEventListener('click', () => {
            document.querySelector('.loader').classList.add('is-active');
        });
    }, []);
}