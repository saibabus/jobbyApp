import './index.css'

const FilterGroup = props => {
  const {salaryrangevalueis, employemtfilter} = props
  const ischecked = true

  const changecheckboxstatus = event => {
    employemtfilter(event.target.value)
  }

  const renderallEmployTypes = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(each => (
      <li className="eachType" key={each.employmentTypeId}>
        <input
          type="checkbox"
          id={each.employmentTypeId}
          value={each.employmentTypeId}
          name={each.label}
          onChecked={ischecked}
          onChange={changecheckboxstatus}
        />
        <label className="lable" htmlFor={each.employmentTypeId}>
          {each.label}
        </label>
      </li>
    ))
  }
  const changeradioValue = event => {
    salaryrangevalueis(event.target.value)
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
          onChange={changeradioValue}
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
