import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { addDays, format, startOfWeek, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date()));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState('');

  const timeSlots = ['all-day'];

  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("calendarData"));
    if (savedData) {
      setCalendarData(savedData);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handleSlotClick = (date, time) => {
    setSelectedSlot({ date, time });
    setNewEventTitle('');
  };

  const addEvent = (e) => {
    e.preventDefault();
    if (selectedSlot && newEventTitle.trim()) {
      const newEvent = {
        date: format(selectedSlot.date, 'yyyy-MM-dd'),
        time: selectedSlot.time,
        title: newEventTitle.trim()
      };
      setEvents([...events, newEvent]);
      setNewEventTitle('');
      setSelectedSlot(null);
    }
  };

  const deleteEvent = (eventToDelete) => {
    setEvents(events.filter(event => 
      !(event.date === eventToDelete.date && 
        event.time === eventToDelete.time && 
        event.title === eventToDelete.title)
    ));
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const getEventForSlot = (date, time) => {
    return events.find(event => 
      event.date === format(date, 'yyyy-MM-dd') && 
      event.time === time
    );
  };

  const navigateWeek = (direction) => {
    setCurrentWeekStart(prev => addDays(prev, direction * 7));
    setSelectedSlot(null);
  };

  return (
    <Card className="w-[500px] mx-auto bg-white ml-[-3px]">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <Button 
            onClick={() => navigateWeek(-1)}
            variant="ghost"
            className="hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <CardTitle className="text-xl font-bold text-gray-800">
            {format(currentWeekStart, 'MMMM d')} - {format(addDays(currentWeekStart, 6), 'MMMM d, yyyy')}
          </CardTitle>
          <Button 
            onClick={() => navigateWeek(1)}
            variant="ghost"
            className="hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-7 gap-2px bg-gray-200 rounded-lg overflow-hidden">
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className="bg-white w-[70px]">
              <div className="h-12 flex flex-col items-center justify-center border-b">
                <div className="font-medium text-gray-600 text-sm">{format(day, 'EEE')}</div>
                <div className={`text-lg ${
                  format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-800'
                }`}>
                  {format(day, 'd')}
                </div>
              </div>
              <div
                onClick={() => handleSlotClick(day, 'all-day')}
                className={`h-24 border-b border-r p-1 cursor-pointer transition-colors
                  ${selectedSlot?.date === day && selectedSlot?.time === 'all-day'
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                {getEventForSlot(day, 'all-day') ? (
                  <div className="bg-blue-100 text-blue-800 p-1.5 rounded-md h-full relative group">
                    <div className="font-medium text-xs">
                      {getEventForSlot(day, 'all-day').title}
                    </div>
                    <button
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEvent(getEventForSlot(day, 'all-day'));
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {selectedSlot && (
          <form onSubmit={addEvent} className="mt-4 flex gap-2">
            <Input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder={`Add event for ${format(selectedSlot.date, 'EEE')}`}
              className="flex-1 text-sm"
              autoFocus
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="bg-teal-500 hover:bg-teal-600 text-white px-4">
                Add
              </Button>
              <Button 
                type="button" 
                size="sm"
                variant="secondary" 
                onClick={() => setSelectedSlot(null)}
                className="px-4"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default Calendar;