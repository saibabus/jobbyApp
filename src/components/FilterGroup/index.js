import './index.css'

const FilterGroup = props => {
  const renderallEmployTypes = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(each => (
      <li className="eachType" key={each.employmentTypeId}>
        <input
          type="checkbox"
          id={each.employmentTypeId}
          value={each.label}
          name={each.employmentTypeId}
        />
        <label className="lable" htmlFor={each.employmentTypeId}>
          {each.label}
        </label>
      </li>
    ))
  }

  const renderallSalaryRanges = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(each => (
      <li className="eachType" key={each.salaryRangeId}>
        <input
          type="radio"
          id={each.salaryRangeId}
          value={each.salaryRangeId}
          name="range"
        />
        <label className="lable" htmlFor={each.salaryRangeId}>
          {each.label}
        </label>
      </li>
    ))
  }

  const renderEmployemt = () => (
    <ul className="allListsCon">{renderallEmployTypes()}</ul>
  )

  const renderSalaries = () => (
    <ul className="allListsCon">{renderallSalaryRanges()}</ul>
  )
  return (
    <div className="filterCont">
      <hr className="lineis1" />
      <div className="optionsCon">
        <div className="rangesAliCon">
          <h1 className="filter-heading">Type of Employment</h1>
          {renderEmployemt()}
        </div>
        <hr className="lineis2" />
        <div className="rangesAliCon">
          <h1 className="filter-heading">Salary Range</h1>
          {renderSalaries()}
        </div>
      </div>
    </div>
  )
}

export default FilterGroup
