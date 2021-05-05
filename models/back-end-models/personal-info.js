export const PersonalInfo = ({
  name,
  email,
  socialTag = null,
  description = null
}) => ({
  name: name,
  email: email,
  socialTag: socialTag,
  description: description
})

export default PersonalInfo;