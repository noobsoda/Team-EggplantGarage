import React from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import ItemCard from "../../Molecules/Cards/ItemCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLiveDetails } from "../../util/api/liveApi";

export default function LiveshowDetail() {
  const { state } = useLocation();
  console.log(state); // in this state liveshow id 담겨있음
  //axios 통신후 데이터 뿌리기
  const [live, setLive] = useState(undefined);
  const [productList, setProductList] = useState(undefined);
  useEffect(() => {
    getLiveDetails(({ data }) => {
      console.log(data);
      //콘솔에 찍어보고 live 넣기.
      setLive(data);
      setProductList(data.liveProductInfoList);
    });
  }, []);
  return (
    <Page>
      <Header isName="True" headerName="라이브쇼상세" />
      <Body>
        <div className="page-header">라이브쇼 제목</div>
        <div className="body1-regular">방송시작 시간 : 23.02.01 18:00</div>
        <div className="body1-regular">방송시간 : 1.5시간</div>
        <hr></hr>
        <div className="body1-header">판매제품 목록</div>
        {/* {productList &&
            productList.map((item) => {
              return <LiveshowItem key={item.id} item={item} isSeller={true} isReview={false} />;
            })} */}
        <ItemCard
          buttonType={"purchasedhistory"}
          isReview={false}
          isSeller={true}
        />
        <ItemCard
          buttonType={"purchasedhistory"}
          isReview={false}
          isSeller={true}
        />
        <ItemCard
          buttonType={"purchasedhistory"}
          isReview={true}
          isSeller={true}
        />
        <ItemCard
          buttonType={"purchasedhistory"}
          isReview={true}
          isSeller={true}
        />
        <ItemCard
          buttonType={"purchasedhistory"}
          isReview={true}
          isSeller={true}
        />
        <ItemCard
          buttonType={"purchasedhistory"}
          isReview={true}
          isSeller={true}
        />
      </Body>
    </Page>
  );
}
