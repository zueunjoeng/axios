import React, { useState } from 'react';

const navi = [
    {
        "gnbnm": "미션",
        "gnblink": "misson",
        "prnum": "대메뉴1",
        "cateno": "1"
    },
    {
        "gnbnm": "소싱철학",
        "gnblink": "sourcing",
        "prnum": "대메뉴1",
        "cateno": "2"
    },
    {
        "gnbnm": "후기",
        "gnblink": "review",
        "prnum": "대메뉴2",
        "cateno": "1"
    },
    {
        "gnbnm": "혜택",
        "gnblink": "benefit",
        "prnum": "대메뉴2",
        "cateno": "2"
    },
];

function Menu() {
    const [다시정리, 다시정리세팅함수] = useState({});
    //useState 변수가 object이거나 array면 반드시 스프레스 연산자 사용
    //새로운 object/array를 선언해서 옮겨주고 그 옮긴 변수를
    //useState 함수로 랜더링할 것.

    const insetdb = () => {
        const updatedData = { ...다시정리 };
        for (let item of navi) {
            if (!updatedData[item.prnum]) {
                updatedData[item.prnum] = [];
            }
            updatedData[item.prnum].push(item);
        }
        다시정리세팅함수(updatedData);
    };

    return (
        <p onClick={insetdb}>
            나를 클릭하고 콘솔창 확인
            {console.log(다시정리)}
        </p>
    );
}

export default Menu;
