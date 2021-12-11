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
