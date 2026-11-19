import {
  ArrowRight, BookOpen, ChartColumn, Check, ChevronDown, ChevronRight, CirclePlay,
  Clock3, Database, GraduationCap, GripVertical, LayoutDashboard,
  Plus, TrendingUp, Users, Video, Wallet,
} from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './mockups.module.css';

type ScreenProps = {
  title: string;
  description: string;
  initials?: string;
  children: ReactNode;
};

function Screen({ title, description, initials = 'DM', children }: ScreenProps) {
  return (
    <div className={styles.screen} role="img" aria-label={description}>
      <div aria-hidden="true">
        <div className={styles.toolbar}>
          <span className={styles.wordmark}><i><GraduationCap size={15} /></i>Ziqx Skills</span>
          <span className={styles.screenTitle}>{title}</span>
          <span className={styles.previewLabel}>Preview</span>
          <span className={styles.avatar}>{initials}</span>
        </div>
        <div className={styles.canvas}>{children}</div>
      </div>
    </div>
  );
}

const courses = [
  { title: 'Spreadsheet basics', lessons: 22, learners: 196, icon: TrendingUp, color: styles.sky },
  { title: 'Data analysis', lessons: 40, learners: 86, icon: Database, color: styles.lavender },
  { title: 'Data visualization', lessons: 16, learners: 24, icon: ChartColumn, color: styles.lime },
];

const metrics = [
  { label: 'Published courses', value: '4', icon: BookOpen },
  { label: 'Total learners', value: '284', icon: Users },
  { label: 'Content hours', value: '36', icon: Clock3 },
  { label: 'Course revenue', value: '$10,096', icon: Wallet },
];

export function TeacherDashboardMock() {
  return (
    <Screen title="Overview" description="Sample trainer overview for Daniel showing course performance, enrolments, revenue and an upcoming live session.">
      <div className={styles.heading}>
        <div><strong>Good morning, Daniel</strong><small>Here’s how your courses are doing today.</small></div>
        <span className={styles.blackAction}><Plus size={12} />Create course</span>
      </div>
      <div className={styles.metrics}>
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label}><Icon size={15} /><strong>{value}</strong><small>{label}</small></div>
        ))}
      </div>
      <div className={styles.subhead}><strong>Course performance</strong><LayoutDashboard size={14} /></div>
      <div className={styles.courseTable}>
        <div className={styles.tableHead}><span>Course</span><span>Status</span><span>Learners</span></div>
        {courses.map(({ title, lessons, learners, icon: Icon, color }) => (
          <div className={styles.courseRow} key={title}>
            <span className={styles.courseName}><i className={color}><Icon size={15} /></i><span><b>{title}</b><small>{lessons} lessons</small></span></span>
            <span className={styles.published}><Check size={10} />Published</span>
            <b className={styles.number}>{learners}</b>
          </div>
        ))}
      </div>
      <div className={styles.live}>
        <span className={styles.liveIcon}><Video size={18} /></span>
        <span><small>Upcoming live session</small><b>Data analysis: Q&amp;A</b></span>
        <span className={styles.liveTime}>Today · 10:00 AM</span>
      </div>
    </Screen>
  );
}

const lessons = [
  { title: 'Spotting bad data', time: '9 min' },
  { title: 'Removing duplicates', time: '14 min' },
  { title: 'Fixing dates and text', time: '10 min' },
];

export function CourseBuilderMock() {
  return (
    <Screen title="Courses" description="Sample course outline for Data analysis, with video lessons grouped under Cleaning messy data.">
      <div className={styles.heading}>
        <div><strong>Data analysis</strong><small>6 modules · 40 lessons</small></div>
        <span className={styles.published}><Check size={10} />Published</span>
      </div>
      <div className={styles.tabs}><span>Overview</span><b>Modules &amp; Lessons</b><span>Learners</span></div>
      <div className={styles.subhead}><strong>Modules and lessons</strong><span className={styles.quietAction}><Plus size={12} />Add module</span></div>
      <div className={styles.moduleRow}><span>1</span><b>Getting started</b><small>5 lessons</small><ChevronRight size={14} /></div>
      <div className={styles.moduleRow}><span>2</span><b>Cleaning messy data</b><small>8 lessons</small><ChevronDown size={14} /></div>
      <div className={styles.lessons}>
        {lessons.map(({ title, time }) => (
          <div key={title}><GripVertical size={12} /><CirclePlay size={14} /><b>{title}</b><small>{time}</small></div>
        ))}
      </div>
      <div className={styles.moduleRow}><span>3</span><b>Exploring datasets</b><small>7 lessons</small><ChevronRight size={14} /></div>
    </Screen>
  );
}

const enrolled = [
  { ...courses[1], progress: 45 },
  { ...courses[0], progress: 100 },
  { ...courses[2], progress: 0 },
];

export function StudentPortalMock() {
  return (
    <Screen title="My courses" initials="MS" description="Sample learner portal for Maria showing a lesson to resume, course enrolments and completion progress.">
      <div className={styles.heading}><div><strong>Welcome back, Maria</strong><small>Pick up where you left off.</small></div></div>
      <div className={styles.tabs}><b>My courses</b><span>Other courses</span></div>
      <div className={styles.resume}>
        <span className={styles.resumeIcon}><Database size={24} /></span>
        <div><small>Continue learning</small><strong>Data analysis</strong><span>Lesson 3 · Fixing dates and text</span></div>
        <span className={styles.resumeArrow}><ArrowRight size={17} /></span>
      </div>
      <div className={styles.subhead}><strong>My courses</strong><small>3 enrolled</small></div>
      <div className={styles.enrolled}>
        {enrolled.map(({ title, lessons: count, progress, icon: Icon, color }) => (
          <div key={title} className={styles.miniCourse}>
            <div className={color}><Icon size={24} strokeWidth={1.6} /></div>
            <div className={styles.miniDetails}><b>{title}</b><small>{count} lessons</small><span className={styles.track}><i style={{ width: progress + '%' }} /></span><small>{progress ? progress + '% complete' : 'Not started'}</small></div>
          </div>
        ))}
      </div>
    </Screen>
  );
}
