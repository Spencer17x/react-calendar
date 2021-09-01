import React, {useEffect, useState} from 'react';
import dayjs, {Dayjs} from "dayjs";
import classNames from "classnames";
import css from './index.module.css';

const Calendar = () => {
  const [weeks] = useState(['日', '一', '二', '三', '四', '五', '六']);
  const [showDates, setShowDates] = useState<Dayjs[]>([]);
  const [showPanelDate, setShowPanelDate] = useState(dayjs());
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [clickedDate, setClickedDate] = useState();

  useEffect(() => {
    // 当月1号是周几
    const firstDayOfMoth = dayjs().month(showPanelDate.month()).day();
    const nextValues = Array(42).fill(0).map((v, i) => {
      const renderDay = i - firstDayOfMoth + 1;
      return dayjs().year(showPanelDate.year()).month(showPanelDate.month()).date(renderDay);
    });
    setShowDates(nextValues);
  }, [showPanelDate])

  const onClickDate = (date: Dayjs) => {
    const week = [0, 1, 2, 3, 4, 5, 6];
    const selectedDates = week.map(weekIndex => {
      return dayjs(date).add(weekIndex, 'day')
    });
    setSelectedDates(selectedDates);
  }

  return <div className={css.calendar}>
    {/*header*/}
    <div className={css.calendarHeader}>
      <span className={css.toggleButton} onClick={() => setShowPanelDate(showPanelDate.subtract(1, 'month'))}>-</span>
      <span>当前年份: {showPanelDate.year()}</span>
      <span>当前月份: {showPanelDate.month() + 1}</span>
      <span className={css.toggleButton} onClick={() => setShowPanelDate(showPanelDate.add(1, 'month'))}>+</span>
    </div>
    {/*header*/}
    {/*panel*/}
    <div className={css.calendarPanel}>
      <div className={css.calendarPanelWeek}>
        {
          weeks.map((v, index) => {
            return <div key={index} className={css.weekDate}>{v}</div>
          })
        }
      </div>

      <div className={css.calendarPanelDate}>
        {
          showDates.map((v, index) => {
            const isToday = dayjs(v).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') &&
              dayjs().month() === showPanelDate.month();
            const isVisible = dayjs(v).format('YYYY-MM') === showPanelDate.format('YYYY-MM');
            const isChosen = selectedDates
              .map(selectedDate => dayjs(selectedDate).format('YYYY-MM-DD'))
              .includes(dayjs(v).format('YYYY-MM-DD'));
            return <div onClick={() => onClickDate(v)} key={index} className={classNames(css.date, {
              [css.visible]: isVisible,
              [css.today]: isToday,
              [css.chosen]: isChosen
            })}>
              {v.date()}
            </div>
          })
        }
      </div>
      {/*panel*/}
    </div>
  </div>
}

export default Calendar;