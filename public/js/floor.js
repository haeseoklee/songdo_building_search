window.onload = () => {
     //지도를 담을 영역의 DOM 레퍼런스

    getBuildingInfo(drawMap);
}

const drawMap = (result) => {
    const container = document.getElementById('map');
    const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(result.Lat, result.Lng), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
}

const getBuildingInfo = (func) => {
    const result = {};
    (async () =>{
        let response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${buildingAddress}`, {
            method: 'GET',
            headers: {
                'Authorization': 'KakaoAK b42b5691e4c59952b4855dff3eab6064',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        });
        response = await response.json();
        if (!response.documents.length) {
            result.Lat = 33.450701;
            result.Lng = 126.570667;
        }
        else {
            result.Lat = response.documents[0].y;
            result.Lng = response.documents[0].x;
        }
        
        func(result);
    })();
}