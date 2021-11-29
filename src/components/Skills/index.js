import './index.css'

const Skills = props => {
  const {skills} = props
  const {name, imageUrl} = skills
  return (
    <li className="eachsillCon">
      <img src={imageUrl} alt={name} className="skillLogo" />
      <p className="skillDiscr">{name}</p>
    </li>
  )
}
export default Skills
