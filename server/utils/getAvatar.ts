const { floor, random } = Math;

const icons = [
  "https://maxcdn.icons8.com/Share/icon/ios7/Cinema/anonymous_mask1600.png",
  "https://image.flaticon.com/icons/png/512/99/99618.png",
  "https://maxcdn.icons8.com/Share/icon/Dusk_Wired/Cinema/anonymous_mask1600.png",
];

const getAvatar = () => {
  return icons[floor(random() * icons.length)];
};

export default getAvatar;
