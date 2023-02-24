import React, {useState} from "react";
import {detailMenu} from "./menu";
import styled, {keyframes} from 'styled-components';
import bonobono from "./asset/dinobono.jpeg";
import amy from "./asset/amy.png";
import dinoCrying from "./asset/dinocrying.jpeg";


const LunchMain = () => {

    const [curMain, setCurMain] = useState(null);
    const [curSub, setCurSub] = useState(null);
    const [selectedList, setSelectedList] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const onClickMainMenu = (menu) => {
        setCurMain(menu);
        setCurSub(null);
        setSelectedMenu("");
    }

    const onClickCancelSelect = (menu) => {
        setSelectedList(selectedList.filter((m) => m !== menu));
        setSelectedMenu("");
    }

    const onClickSelectMenu = (menu) => {
        if(curSub !== null && !selectedList.includes(menu)) {
          setSelectedList([...selectedList, menu]);
          setSelectedMenu("");
        }
    }

    const onClickRandomGame = () => {
      if(selectedList.length === 0) {
        return;
      }
      setIsLoading(true);

      const randomIdx = Math.floor(Math.random() * selectedList.length);
      setSelectedMenu(selectedList[randomIdx]);

      setTimeout(() => setIsLoading(false), 3000);

    }

    const onClickReset = () => {
      setSelectedList([]);
      setSelectedMenu("");
    }

    return (
        <div>
            <Title>
              <img src={dinoCrying} alt={"dino"}/>의 점심 메뉴 고르기를 도와주세요!!!
            </Title>
            <MenuCategory>
                {
                    Object.keys(detailMenu).map((menu) => {
                        return (
                            <Menu
                                key={menu}
                                isSelected={menu === curMain}
                                onClick={() => onClickMainMenu(menu)}>
                                {menu}
                            </Menu>
                        )
                    })
                }
            </MenuCategory>
            <MenuCategory>
                {
                    curMain !== null &&
                    Object.keys(detailMenu[curMain]).map((menu) => {
                        return (
                            <Menu
                                isSelected={menu === curSub}
                                onClick={() => setCurSub(menu)}>
                                {menu}
                            </Menu>
                        )
                    })
                }
            </MenuCategory>
            <SubCardArea>
                {
                    curSub !== null &&
                    detailMenu[curMain][curSub]?.map((menu) => {
                        return (
                            <Card key={menu}
                                  onClick={() => onClickSelectMenu(menu)}>
                                {menu}
                            </Card>
                        )
                    })

                }
            </SubCardArea>


            <SelectedTitle>
                디노의 선택 리스트.. <span onClick={onClickReset}>리셋</span>
            </SelectedTitle>

            <SelectedList>
                {
                    selectedList.map((selectedMenu) => {
                        return (
                            <SelectedMenu key={selectedMenu}>
                                {selectedMenu} <span onClick={() => onClickCancelSelect(selectedMenu)}>X</span>
                            </SelectedMenu>
                        )
                    })
                }
            </SelectedList>

          <ButtonArea>
              <RandomButton onClick={onClickRandomGame}>
                1개 뽑기
              </RandomButton>
              <RandomButton onClick={onClickRandomGame}>
                다시 뽑기
              </RandomButton>
            <RandomButton onClick={() => setSelectedMenu("")}>
              리셋
            </RandomButton>
          </ButtonArea>

          {
            (selectedMenu !== "" && !isLoading) &&
                <SelectedOne>
                  <span>⭐️{selectedMenu}⭐️</span> 당첨~~~~~~!!
                </SelectedOne>
          }

          {
            isLoading &&
              <BonoBonoLoading isLoading={isLoading}>
                <div>아 나 시키지 말라고...</div>
                <img src={bonobono} alt={"dinobono"}/>
              </BonoBonoLoading>
          }

            <MadeBy
                onMouseOver={() => setIsHover(true)}
                onMouseOut={() => setIsHover(false)}
            >
              made by 에이미
            </MadeBy>
          {
            isHover && <AmyImg src={amy}/>
          }


        </div>
    )
};
export default LunchMain;


const rotate = keyframes`
  100% {
    transform: rotate(360deg);
    }
`;

const Title = styled.div`
  text-align: center;
  margin: 80px auto 50px;
  font-size: 28px;
  font-weight: bold;
  
  span {
    color: rgba(50, 142, 251,1);
  }
  
  img {
    width: 80px;
    
    &:hover {
      animation: ${rotate} 2s linear infinite;
    }
  }
`;
const MenuCategory = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 30px auto 0;
`;
const SubCardArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: rgba(50, 142, 251, 0.2);
  min-height: 70px;
  max-width: 800px;
  border-radius: 6px;
  margin: 30px auto;
  padding: 20px;
`;
const Card = styled.div`
  margin: 20px 30px;
  font-size: 20px;
  color: black;
  padding: 15px 20px;
  border: 1px solid lightblue;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #328EFB;
    background-color: white;
    font-weight: bold;
  }
  
`;
const Menu = styled.div`
  margin-right: 20px;
  cursor: pointer;

  ${(props) => props.isSelected && `
    color: #328EFB;
    font-weight: bold;
  `};
  
  &:hover {
    color: #328EFB;
    font-weight: bold;
  }
`;

const SelectedTitle = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin: 40px auto 20px;

  span {
    font-size: 15px;
    font-weight: normal;
    margin-left: 10px;
    cursor: pointer;
  }
`;
const SelectedList = styled.div`
  display: flex;
  margin: auto;
  flex-wrap: wrap;
  background-color: rgba(50, 142, 251, 0.2);
  max-width: 800px;
  min-height: 50px;
  border-radius: 6px;
  padding: 20px;
`;

const SelectedMenu = styled(Card)`
  cursor: pointer;
  
  span {
    font-size: 14px;
    font-weight: bold;
    margin-left: 8px;
    cursor: pointer;
  }
`;

const RandomButton = styled.div`
  text-align: center;
  margin: 60px 20px 0 0;
  font-size: 16px;
  padding: 20px;
  width: 150px;
  border: 1px solid black;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    font-weight: bold;
    background-color: rgba(50, 142, 251, 0.2);
  }
`;

const SelectedOne = styled.div`
  text-align: center;
  font-size: 18px;
  margin-bottom: 100px;
  span {
    font-weight: bold;
    color: #328EFB;
    font-size: 26px;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  width: 400px;
  justify-content: center;
  margin: 0 auto 40px;
`;

const byeBonoBono = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  
  100% {
    transform: rotate(350deg);
    opacity: 0;
  }
`;

const BonoBonoLoading = styled.div`
  margin: 30px auto;
  text-align: center;
  animation: ${byeBonoBono} 5s linear;
  
  div {
    font-size: 18px;
    margin-bottom: 4px;
  }
`;

const fadeInToUp = keyframes`
  0% {
    transform: translate3d(0, 100%, 0px);
  }
  to {
    bottom: 30px;
    transform: translateZ(0);
  }
`;

const MadeBy = styled.div`
  font-size: 10px;
  color: gray;
  display: flex;
  justify-content: end;
  position: fixed;
  bottom: 30px;
  right: 30px;
`;

const AmyImg = styled.img`
  width: 100px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  animation: ${fadeInToUp} 2s 1;
`;



