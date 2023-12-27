export const genreName = (genres: any, genreArr: any) => {
  let arr = [];
  for (let i = 0; i < genres.length; i++) {
    for (let j = 0; j < genreArr?.length; j++) {
      if (genres[i] === genreArr[j].id) {
        arr.push(genreArr[j].name);
      }
    }
  }
  return arr;
};

export const generateStringDate = (date: string) => {
  let arr = date?.split('-');
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let monthIndex = +arr[1];

  return `${arr[2]} ${month[monthIndex - 1]} ${arr[0]}`;
};
