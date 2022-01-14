import faker from "faker";
let uid = 0;

interface UserInfo {
  name: string;
  avatar: string;
}
export interface MsgInfo {
  message: string;
  avatar: string;
}
interface userSet {
  [propName: string]: UserInfo[];
}
interface DataType{
  id:number,
  index:number,
  type:'letter'|'person',
  value:UserInfo,
  height:number
}

function generateItem(): UserInfo {
  return {
    name: faker.name.findName(),
    avatar: faker.internet.avatar(),
  };
}
//todo letter 未实现
export function getData(count: number, letters: boolean):DataType[] {
  const raw:userSet = {};

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  for (var l of alphabet) {
    raw[l] = [];
  }

  for (var i = 0; i < count; i++) {
    const item = generateItem();
    const letter = item.name.charAt(0).toLowerCase();
    raw[letter].push(item);
  }
  const list:DataType[] = [];
  let index = 1;

  for (const l of alphabet) {
    raw[l] = raw[l].sort((a, b) => (a.name < b.name ? -1 : 1));
    // if (letters) {
    //   list.push({
    //     id: uid++,
    //     index: index++,
    //     type: "letter",
    //     value: l,
    //     height: 200,
    //   });
    // }
    for (var item of raw[l]) {
      list.push({
        id: uid++,
        index: index++,
        type: "person",
        value: item,
        height: 50,
      });
    }
  }

  return list;
}

export function addItem(list:DataType[]) {
  list.push({
    id: uid++,
    index: list.length + 1,
    type: "person",
    value: generateItem(),
    height: 50,
  });
}

export function generateMessage():MsgInfo {
  return {
    avatar: faker.internet.avatar(),
    message: faker.lorem.text(),
  };
}

let idCounter = 0
export interface TextInfo{
  id:string,
  text:string
}
export function getListData(count:number):TextInfo[] {
  const data:TextInfo[] = []
  for (let index = 0; index < count; index++) {
    data.push({
      id: String(idCounter++),
      text: Math.random()
        .toString(16)
        .substr(10)
    })
  }
  return data
}

