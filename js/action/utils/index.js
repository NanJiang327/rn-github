/* eslint-disable radix */
export function handleData(actionType, dispatch, storeName, data, pageSize) {
  let fixItems = [];

  if (data?.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else {
      fixItems = data.data.items;
    }
  }

  dispatch({
    type: actionType,
    projectModes:
      pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
    storeName,
    items: fixItems,
    pageIndex: 1,
  });
}

export function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16);

  return '#' + RR + GG + BB;
}
