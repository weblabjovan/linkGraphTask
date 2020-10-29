export const bubbleSort = (a: Array<any>, b: string, d: string) => {
  if(d === "DESC"){
    return bubbleSortDesc(a, b);
  }

  return bubbleSortAsc(a,b);
}

const bubbleSortAsc = (a: Array<any>, b: string) => {
    var swapp;
    var n = a.length-1;
    var x=a;
    do {
        swapp = false;
        for (var i=0; i < n; i++)
        {
            if (x[i][b] > x[i+1][b])
            {
              var temp = x[i];
              x[i] = x[i+1];
              x[i+1] = temp;
              swapp = true;
            }
        }
        n--;
    } while (swapp);

  return x; 
}

const bubbleSortDesc = (a: Array<any>, b: string) => {
  var swapp;
  var n = a.length-1;
  var x=a;
  do {
      swapp = false;
      for (var i=0; i < n; i++)
      {
          if (x[i][b] < x[i+1][b])
          {
            var temp = x[i];
            x[i] = x[i+1];
            x[i+1] = temp;
            swapp = true;
          }
      }
      n--;
  } while (swapp);

return x; 
}

export const getListPart = (list: Array<any>, page: number, size: number): Array<any> => {
  const start = (page-1) * size;
  const stop = page*size;
  return list.slice(start, stop);
}

export const getListWithKeyword = (list: Array<any>, keyword: string): Array<any> => {
  const newList = [...list];
  if(keyword){
    const keywordList = [];
    for (let index = 0; index < newList.length; index++) {
      if(newList[index]['symbol'].includes(keyword)){
        keywordList.push(newList[index]);
      }
    }

    return keywordList;
  }

  return newList;
}

export const unixToTimeString = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const formattedTime = `${month}/${day}/${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;

  return formattedTime;
}

export const binarySearch = (arr: Array<{id: number}>, id: number): number => { 
  let start=0;
  let end =arr.length-1; 

  while (start<=end){ 
      let mid=Math.floor((start + end)/2); 
 
      if (arr[mid].id === id){
        return mid; 
      }else if (arr[mid].id < id){
        start = mid + 1;
      }else{
        end = mid - 1;
      }       
  } 
 
  return -1; 
}

export const getNewList = (): Promise<any> => {
  return fetch('https://cors-anywhere.herokuapp.com/http://api.bitcoincharts.com/v1/markets.json').then( res => { return res.json() });
}

export const setNewAlertsList = (currencyList: Array<any>, alertsList: Array<any>, triggersList: Array<any>): Array<any> => {
  if(triggersList.length){
    const currencyObj = setArrayAsObject([...currencyList], 'symbol');
    const alertsListCopy = [...alertsList];

    for (let index = 0; index < triggersList.length; index++) {
      if(triggersList[index]['listenProp'] === 'onFall'){
        if(currencyObj[triggersList[index]['symbol']][triggersList[index]['listenType']] < triggersList[index]['limit']){
          const newAlert = {
            id: alertsListCopy.length ? alertsListCopy[alertsListCopy.length - 1]['id'] + 1 : 1,
            trigger: triggersList[index]['id'],
            message: setAlertMessage(triggersList[index]),
            timeStamp: Math.round((new Date()).getTime() / 1000)
          }
          alertsListCopy.push(newAlert);
        }
      }else{
        if(currencyObj[triggersList[index]['symbol']][triggersList[index]['listenType']] > triggersList[index]['limit']){
          const newAlert = {
            id: alertsListCopy.length ? alertsListCopy[alertsListCopy.length - 1]['id'] + 1 : 1,
            trigger: triggersList[index]['id'],
            message: setAlertMessage(triggersList[index]),
            timeStamp: Math.round((new Date()).getTime() / 1000)
          }
          alertsListCopy.push(newAlert);
        }
      }
    }

    return alertsListCopy;
  }
  
  return alertsList;
}

const setAlertMessage = (trigger: object): string => {
  const action = trigger['listenProp'] === 'onFall' ? 'is falling bellow' : 'is raising above';
  return `Hey, ${trigger['symbol']} ${trigger['listenType']} ${action} ${trigger['limit']}, check out the new value.`;
}

const setArrayAsObject = (arr: Array<any>, prop: string): object => {
  const res = {};
  for (let index = 0; index < arr.length; index++) {
    res[arr[index][prop]] = arr[index];
  }

  return res;
}