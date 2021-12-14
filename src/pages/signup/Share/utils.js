let alphabetArr = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ё",
  "Ж",
  "З",
  "И",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "Ө",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ү",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "Ь",
  "Э",
  "Ю",
  "Я",
];

let nameAlphabetArr = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ё",
  "Ж",
  "З",
  "И",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "Ө",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ү",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "Ь",
  "Э",
  "Ю",
  "Я",
  "а",
  "б",
  "в",
  "г",
  "д",
  "е",
  "ё",
  "ж",
  "з",
  "и",
  "й",
  "к",
  "л",
  "м",
  "н",
  "о",
  "ө",
  "п",
  "р",
  "с",
  "т",
  "у",
  "ү",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
  "ы",
  "ь",
  "э",
  "ю",
  "я",
];

export const checkRegNumber = (values) => {
  let letters = [...values];
  if (
    !alphabetArr.includes(letters[0].toUpperCase()) ||
    !alphabetArr.includes(letters[1].toUpperCase())
  ) {
    return false;
  }
  return true;
};

export const passwordReg = (value) => {
  var re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.?<>}{])(?=.*[0-9])(?=.{6,})"
  );
  return re.test(value);
};

export const checkFirstName = (values) => {
  let letters = [...values];
  if (!nameAlphabetArr.includes(letters)) {
    return false;
  }
  return true;
};

export const checkLastName = (values) => {
  let letters = [...values];
  if (!nameAlphabetArr.includes(letters)) {
    return false;
  }
  return true;
};
