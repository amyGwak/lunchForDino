import React, {useState} from "react";
import {detailMenu} from "./menu";
import styled from 'styled-components';


const LunchMain = () => {

    const [curMain, setCurMain] = useState(null);
    const [curSub, setCurSub] = useState(null);
    const [selectedList, setSelectedList] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState("");

    const onClickMainMenu = (menu) => {
        setCurMain(menu);
        setCurSub(null);
    }

    const onClickCancelSelect = (menu) => {
        setSelectedList(selectedList.filter((m) => m !== menu));
    }

    const onClickSelectMenu = (menu) => {
        if(curSub !== null && !selectedList.includes(menu)) {
          setSelectedList([...selectedList, menu]);
        }
    }

    const onClickRandomGame = () => {
      const randomIdx = Math.floor(Math.random() * selectedList.length);
      setSelectedMenu(selectedList[randomIdx])
    }

    return (
        <div>
            <Title><span>디노</span>의 점심 메뉴 고르기를 도와주세요!!!</Title>
            <MenuCategory>
                {
                    Object.keys(detailMenu).map((menu) => {
                        return (
                            <Menu
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
                            <Card onClick={() => onClickSelectMenu(menu)}>
                                {menu}
                            </Card>
                        )
                    })

                }
            </SubCardArea>


            <SelectedTitle>
                디노의 선택 리스트.. <span onClick={() => setSelectedList([])}>리셋</span>
            </SelectedTitle>

            <SelectedList>
                {
                    selectedList.map((selectedMenu) => {
                        return (
                            <SelectedMenu>
                                {selectedMenu} <span onClick={() => onClickCancelSelect(selectedMenu)}>X</span>
                            </SelectedMenu>
                        )
                    })
                }
            </SelectedList>

            <RandomButton onClick={onClickRandomGame}>
              1개 뽑기
            </RandomButton>

          {
              selectedMenu !== "" &&
              <SelectedOne>
                <span>⭐️{selectedMenu}⭐️</span> 당첨~~~~~~!!
              </SelectedOne>
          }

            <MadeBy>made by 에이미</MadeBy>

        </div>
    )
};
export default LunchMain;


const Title = styled.div`
  text-align: center;
  margin: 100px auto 50px;
  font-size: 28px;
  font-weight: bold;
  
  span {
    color: rgba(50, 142, 251,1);
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
  margin: 60px auto;
  font-size: 16px;
  padding: 20px;
  width: 140px;
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
  margin-bottom: 100px;
  font-size: 18px;
  span {
    font-weight: bold;
    color: #328EFB;
    font-size: 26px;
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



