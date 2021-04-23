export const example = store => next => action => { //eslint-disable-line
  // Some code
  // console.log(`Тип события: ${action.type}, дополнительные данные события: ${action.payload}`);
  //console.log(action);
  return next(action);
};