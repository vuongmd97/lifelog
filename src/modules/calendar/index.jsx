import useSiteTitle from '../../hook/useSiteTitle';
import './css/calendar.scss';
import Header from './header';
import MainCalendar from './MainCalendar';
import Sidebar from './sidebar';

export default function CalendarContainer() {
    useSiteTitle('calendar');

    return (
        <div className="container calendar">
            <div className="calendar__main flex-column gap-16 h-100">
                <Header />
                <MainCalendar />
            </div>
            <Sidebar />
        </div>
    );
}
