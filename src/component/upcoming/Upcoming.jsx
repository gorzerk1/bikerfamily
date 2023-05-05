import './upcoming.css';

function Upcoming() {
  return (
    <div className="upcoming--body">
      <img src="../../marblebackground.png" alt="" />
      <div className="upcoming--container" dir="rtl">
        <div>LOGO</div>
        <div className='upcoming--title'>אירועים קרובים</div>
        <div className='upcoming--subtitle'>
חוו את הראלי המרגש של קהילת האופנועים יחד עם רוכבים אחרים, כשאתם חוקרים מסלולים תיאוריים וציוד טכנולוגי חדשני לאופנועים. התחברו, שתפו סיפורים ויצירת זכרונות בלתי נשכחים.</div>
      <div className='upcoming--eventimages'>
        <div className='upcoming--rightarrow'>
          <img src="../../eventsup/right-arrow.png" alt="" />
        </div>
        <div className='upcoming--eventimages'>
          <img src="../../eventsup/image1.png" />
          <img src="../../eventsup/image2.png" />
          <img src="../../eventsup/image3.png" />
        </div>
        <div className='upcoming--leftarrow'>
          <img src="../../eventsup/left-arrow.png" alt="" />
        </div>
      </div>
      </div>
    </div>
  );
}

export default Upcoming;
