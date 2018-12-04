import PropTypes from 'prop-types'
import React from 'react'
import dates from './utils/dates'

import Week from './Week'
import TimeGrid from './TimeGrid'

function workWeekRange(date, { workWeekStart }) {
  let start = dates.startOf(date, 'week', workWeekStart)
  let end = dates.endOf(date, 'week', workWeekStart)

  return dates.range(start, end).slice(0, 5)
}

class WorkWeek extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  }

  static defaultProps = TimeGrid.defaultProps

  render() {
    let { date, ...props } = this.props
    let range = workWeekRange(date, this.props)

    return <TimeGrid {...props} range={range} eventOffset={15} />
  }
}

WorkWeek.range = workWeekRange

WorkWeek.navigate = Week.navigate

WorkWeek.title = (date, { localizer, workWeekStart }) => {
  let [start, ...rest] = workWeekRange(date, { workWeekStart })

  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

export default WorkWeek
