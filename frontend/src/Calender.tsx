import React, { useEffect, useState } from 'react';
import './Calender.css';
import axios from 'axios';
//import jQuery from 'jquery';

axios.defaults.withCredentials =true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken'


const getMonthName = (month: number): string => {
  return [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ][month];
};

const getWeekdayNames = (): string[] => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirm2, setShowConfirm2] = useState(false);
  const [repetition, setRepetition] = useState('once');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventSaved, seteventSaved] = useState("")

  useEffect(()=>{
    const email = sessionStorage.getItem('loged')
    console.log(email)
    if(sessionStorage.getItem('loged')){
      axios.get('http://127.0.0.1:8000/eventView/'+email).
      then((res)=>{
        console.log(res.data)
        seteventSaved(res.data)
      })
    }
  },[])

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  //const days = getMonthDays(year, month);

  const goToPreviousMonth = () => {
    const prevMonth = new Date(year, month - 1, 1);
    setCurrentDate(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(year, month + 1, 1);
    setCurrentDate(nextMonth);
  };

  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
 
  const handleButtonClick = (day:number,mon:number,year:number) => {
    const date = new Date();
    date.setFullYear(year,mon,day)
    setSelectedDate(date)
    setShowConfirm(true);
  };

  const handlebtnClick = (day:number,mon:number,year:number) => {
    const date = new Date();
    date.setFullYear(year,mon,day)
    setSelectedDate(date)
    setShowConfirm2(true);
  };
  
  const handleConfirm = () => {
    const id =sessionStorage.getItem('loged') 
    const res=axios.post('http://127.0.0.1:8000/eventAdd/'+id,{'scheduleon':selectedDate,'notes':notes,'repeatation':repetition},{withCredentials:true})
    console.log(res)
    //alert(`Confirmed with notes: ${notes} and repetition: ${repetition} and date: ${selectedDate}`);
    setShowConfirm(false);
  };

  const renderCells = () => {
    console.log(currentDate)
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const blanks = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(<div key={`blank-${i}`} className="empty-cell"></div>);
    }

    const days = [];
    let tr
    for (let day = 1; day <= daysInMonth; day++) {

      const date = new Date(year, month, day);
      console.log(year+'-'+month+'-'+day)
      console.log(eventSaved)
      console.log(eventSaved[0])
      tr=''

      for(let i=0; i<=eventSaved.length;i++){
        console.log('enter once')
        if(month<10 && day<10){
          console.log(year+'-0'+month+'-0'+day)
          if(year+'-0'+month+'-0'+day === eventSaved[i]){
            tr='found'
            console.log('found event')

          }
      }
      }

      if(tr==='found'){
        days.push(
        <div
            key={`day-${day}`}
            className={`calendar-cellevent ${isToday(date) ? 'today' : ''}`}
          >
            
            <button className="day-numberevent" onClick={()=>handlebtnClick(day,month,year)}>{day}</button>
            
          </div>
        );

      }
      else{
        days.push(
          <div
            key={`day-${day}`}
            className={`calendar-cell ${isToday(date) ? 'today' : ''}`}
            // onClick={() => onDateClick && onDateClick(date)}
          >
            
            <button className="day-number" onClick={()=>handleButtonClick(day,month,year)}>{day}</button>
            
          </div>
        );
      }
    }

    // console.log(year)
    // console.log(month)  


    const totalCells = [...blanks,...days];
    const rows: React.ReactNode[] = [];
    let cells: React.ReactNode[] = [];

    totalCells.forEach((cell, i) => {
      if (i % 7 !== 0) {
        cells.push(cell);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(cell);
      }
      if (i === totalCells.length - 1) {
        rows.push(cells);
      }
    });
    // console.log(rows)
    // console.log("space between")
    // console.log(cells)
    return rows.map((row, i) => (
      <div key={`row-${i}`} className="calendar-row" >
        {row}
      </div>
    ));
  };
  
  const renderConfirm2=()=>{
    return(
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000
      }}>
      <button style={{ borderRadius:'3px',marginBottom:'3px',backgroundColor: 'blue',padding: '8px', width: '100%' }}>Edit</button>
      <button style={{ borderRadius:'3px',backgroundColor: 'blue',padding: '8px', width: '100%' }}>Delete</button>
      <button onClick={() => setShowConfirm2(false)}>Cancel</button>
     </div>  
    )
  }

  
  const renderConfirm=()=>{
    return(
    <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000
      }}>
        <h3>Confirm Details</h3>
        <div style={{ marginBottom: '15px' }}>
          <input
            type='text'
            name='notes'
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Enter notes"
            style={{ padding: '8px', width: '100%' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Repetition: </label>
          <select
            value={repetition}
            onChange={e => setRepetition(e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value='once'>once</option>
            <option value='weekly'>weekly</option>
            <option value='monthly'>monthly</option>
            <option value='yearly'>yearly</option>
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
          <button onClick={handleConfirm} style={{ backgroundColor: '#3182ce', color: 'white' }}>
            Confirm
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className="calendar">
      {/* Header */}
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>‹</button>
        <h2>
          {getMonthName(month)} {year}
        </h2>
        <button onClick={goToNextMonth}>›</button>
      </div>

      {/* Weekdays */}
      <div className="days-row ">
        {getWeekdayNames().map((day) => (
          <div className="day-name" key={day}>{day}</div>
        ))}
      </div>

      {/* Days */}
      <div className="calendar-body">{renderCells()}</div>
      {/* <div className="days-row">
        {days.map(({ date, isCurrentMonth }) => (
          <button
            key={date.toISOString()}
            className={`day-number 
              ${!isCurrentMonth ? 'text-gray-400' : ''}
              ${isSameDay(date, selectedDate) ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
            onClick={() => setSelectedDate(new Date(date))}
          >
            {date.getDate()}
          </button>
        ))}
      </div> */}
      {showConfirm && renderConfirm()}
      {showConfirm2 && renderConfirm2()}

      {/* Overlay when dialog is open */}
      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999
        }} />
      )}
      {showConfirm2 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999
        }} />
      )}
    </div>
  );
};

export default Calendar;
