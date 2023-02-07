import React from "react";
import styled from "styled-components";
import TapbarBox from "../../Molecules/Box/TapbarBox";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "../../store/tapbar";

const StyledTapbar = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  // position: absolute;
  // bottom: 0;
  z-index: 1;
  background-color: white;
  border-top: 0.5px solid;
  border-top-color: ${({ theme }) => theme.color.lightgrey};
  box-sizing: border-box;
`;
export default function Tapbar() {
  const array = [
    {
      category: "home",
      name: "홈",
      src: "/image/tapbar/home-icon.svg",
    },
    {
      category: "search",
      name: "검색",
      src: "/image/tapbar/search-icon.svg",
    },
    {
      category: "like",
      name: "좋아요",
      src: "/image/tapbar/like-icon.svg",
    },
    {
      category: "chat",
      name: "채팅",
      src: "/image/tapbar/chat-icon.svg",
    },
    {
      category: "mypage",
      name: "마이페이지",
      src: "/image/tapbar/mypage-icon.svg",
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function goTo(location) {
    navigate("/" + location);
    dispatch(setPage(location));
  }
  return (
    <StyledTapbar>
      {array.map((box, index) => {
        return (
          <TapbarBox
            name={box.name}
            imgSrc={box.src}
            key={index}
            category={box.category}
            clicked={() => goTo(box.category)}
          />
        );
      })}
    </StyledTapbar>
  );
}
