import './index.css'

let listarray = []

const FilterGroup = props => {
  const {salaryrangevalueis, employemtfilter} = props

  const changecheckboxstatus = event => {
    const checkvalueis = event.target.value
    const checkstatusis = event.target.checked
    if (checkstatusis) {
      listarray.push(checkvalueis)
    } else {
      const updatedvalues = listarray.filter(each => each !== checkvalueis)
      listarray = updatedvalues
    }
    //  console.log(checkstatusis)
    const stringis = listarray.join()
    //   console.log(stringis)
    //  console.log(listarray)
    employemtfilter(stringis)
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
