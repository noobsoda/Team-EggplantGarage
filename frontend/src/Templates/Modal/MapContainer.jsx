import React, { useEffect } from "react";

//초기 center는 lng lat redux에 저장한값을 이용하는 것으로 하자
//초기화 하면 현재 내 위치로 옮겨주기. 적용눌렀을때는 지금 떠있는 상태로.
//이 lat lng 현재 내위치를 뽑는건 라이브 시작하기에도 그냥 적용 할 수 있는 것
const MapContainer = () => {
  const { kakao } = window;
  useEffect(
    () => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 4,
      };
      const map = new kakao.maps.Map(container, options);
      let addr = document.getElementById("addr");
      let callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log("지역 명칭 : " + result[0].address_name);
          addr.innerHTML = result[0].address_name;
          //   console.log("행정구역 코드 : " + result[0].code);
          //   console.log(result[0]);
        }
      };
      //위도, 경도로 변환 및 마커표시
      let geocoder = new kakao.maps.services.Geocoder();
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          let lat = position.coords.latitude, // 위도
            lng = position.coords.longitude; // 경도
          //   console.log(lat + " " + lng);
          var moveLatLon = new kakao.maps.LatLng(lat, lng);
          // 지도 중심을 이동 시킵니다
          map.setCenter(moveLatLon);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      }
      //   searchAddrFromCoords(map.getCenter(), displayCenterInfo);
      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, "idle", function () {
        // searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        // console.log(map.getCenter());
        geocoder.coord2RegionCode(
          map.getCenter().getLng(),
          map.getCenter().getLat(),
          callback
        );
      });
    },
    [
      /*표시할 주소 변수*/
    ]
  );
  return (
    <div style={{ width: "280px", height: "320px" }}>
      <div
        id="map"
        style={{
          width: "280px",
          height: "280px",
        }}
      ></div>
      <div
        id="addr"
        className="body1-bold"
        style={{
          height: "40px",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    </div>
  );
};

export default MapContainer;
