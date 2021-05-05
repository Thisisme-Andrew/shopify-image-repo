export const User = ({
  id,
  personalInfo,
  images = [],
  collections = [],
}) => {
 return ({
  id: id,
  personalInfo: personalInfo,
  images: images,
  collections: collections
 })
}

export default User;