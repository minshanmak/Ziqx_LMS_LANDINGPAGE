import { BookOpen, Calendar, Award, BarChart3, Video, Layers } from 'lucide-react';
import styles from './marketing.module.css';

/*
 * Accurate UI recreations of the trainer dashboard and learner portal, based on the
 * reference screens (Overview, Courses, Learners, Live sessions, My courses, Continue learning).
 * All names, figures and prices are DEMONSTRATION data, not real ZIQX metrics.
 */

const demo = <span className={styles.demoBadge}>Demonstration data</span>;

export function TeacherDashboardMock() {
  return (
    <div className={styles.mockFrame} role="img" aria-label="Preview of the ZIQX trainer dashboard showing published courses, learners, revenue and upcoming live sessions. Demonstration data.">
      <div className={styles.mockChrome} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span style={{ marginLeft: 8 }}>Trainer dashboard</span>
        {demo}
      </div>
      <div className={styles.dashGrid} aria-hidden="true">
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#14151A' }}>Good morning, Daniel</div>
          <div style={{ fontSize: 12, color: '#70737E', fontWeight: 500 }}>Here&apos;s how your courses are doing today.</div>
        </div>
        <div className={styles.statRow}>
          <Stat value="4" label="Published courses" />
          <Stat value="284" label="Total learners" />
          <Stat value="36 hrs" label="Total course content" />
          <Stat value="$10,096" label="Course revenue (demo)" />
        </div>
        <div className={styles.dashSplit}>
          <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#14151A', marginBottom: 8 }}>Course performance</div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr><th>Course</th><th>Status</th><th>Learners</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>Spreadsheet basics</strong><br />22 lessons · Free</td><td><span className={`${styles.badge} ${styles.badgePublished}`}>Published</span></td><td>196</td></tr>
                    <tr><td><strong>Data analysis</strong><br />40 lessons · $79</td><td><span className={`${styles.badge} ${styles.badgePublished}`}>Published</span></td><td>86</td></tr>
                    <tr><td><strong>Data visualization</strong><br />16 lessons · $59</td><td><span className={`${styles.badge} ${styles.badgePublished}`}>Published</span></td><td>24</td></tr>
                    <tr><td><strong>UI fundamentals</strong><br />24 lessons · Free</td><td><span className={`${styles.badge} ${styles.badgeDraft}`}>Draft</span></td><td>0</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#14151A', marginBottom: 8 }}>Upcoming live sessions</div>
              <div className={styles.sessionList}>
                <div className={styles.sessionItem} style={{ background: '#DCE7F9' }}>
                  <strong>Data analysis: Q&amp;A</strong>
                  <span>Today · 10:00 – 11:00</span>
                </div>
                <div className={styles.sessionItem} style={{ background: '#EEF3D8' }}>
                  <strong>Data visualization workshop</strong>
                  <span>Thu 22 Oct · 2:00 – 3:00 PM</span>
                </div>
                <div className={styles.sessionItem} style={{ background: '#E8E8FA' }}>
                  <strong>Office hours</strong>
                  <span>Mon 26 Oct · 11:00 – 12:00</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export function CourseBuilderMock() {
  return (
    <div className={styles.mockFrame} role="img" aria-label="Preview of the course builder showing modules and lessons with YouTube Unlisted links. Demonstration data.">
      <div className={styles.mockChrome} aria-hidden="true">
        <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
        <span style={{ marginLeft: 8 }}>Courses · Data analysis</span>
        {demo}
      </div>
      <div className={styles.dashGrid} aria-hidden="true">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#14151A' }}>Data analysis</span>
          <span className={`${styles.badge} ${styles.badgePublished}`}>Published</span>
        </div>
        <div className={styles.statRow}>
          <Stat value="6" label="Modules" />
          <Stat value="40" label="Lessons" />
          <Stat value="86" label="Enrolled learners" />
          <Stat value="$59" label="Price (demo)" />
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          <ModuleRow n={1} title="Getting started" count="5 lessons" />
          <ModuleRow n={2} title="Cleaning messy data" count="8 lessons" open />
          <div style={{ paddingLeft: 28, display: 'grid', gap: 6 }}>
            <LessonRow title="Spotting bad data" meta="youtu.be/… · Unlisted" />
            <LessonRow title="Removing duplicates" meta="youtu.be/… · Unlisted" />
            <LessonRow title="Fixing dates and text" meta="youtu.be/… · Unlisted" />
          </div>
          <ModuleRow n={3} title="Exploring datasets" count="7 lessons" />
        </div>
      </div>
    </div>
  );
}

function ModuleRow({ n, title, count, open }: { n: number; title: string; count: string; open?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #ECECEF', borderRadius: 8, padding: '10px 12px', background: '#fff' }}>
      <span style={{ width: 22, height: 22, borderRadius: 6, background: '#E8E8FA', fontSize: 12, fontWeight: 800, color: '#3B40B8', display: 'grid', placeItems: 'center' }}>{n}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#14151A' }}>{title}</div>
        <div style={{ fontSize: 12, color: '#70737E', fontWeight: 500 }}>{count}</div>
      </div>
      <span style={{ fontSize: 12, color: '#70737E' }}>{open ? '▴' : '▾'}</span>
    </div>
  );
}

function LessonRow({ title, meta }: { title: string; meta: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderRadius: 8, padding: '8px 10px', background: '#F8F8FA' }}>
      <Video size={14} strokeWidth={1.75} color="#5B5E69" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#14151A' }}>{title}</div>
        <div style={{ fontSize: 11, color: '#70737E', fontWeight: 500 }}>{meta}</div>
      </div>
    </div>
  );
}

export function StudentPortalMock() {
  return (
    <div className={styles.mockFrame} role="img" aria-label="Preview of the ZIQX learner portal showing continue learning, enrolled courses with progress, and upcoming live sessions. Demonstration data.">
      <div className={styles.mockChrome} aria-hidden="true">
        <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
        <span style={{ marginLeft: 8 }}>Learner portal</span>
        {demo}
      </div>
      <div className={styles.studentGrid} aria-hidden="true">
        <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#14151A' }}>Welcome back</div>
            <div style={{ fontSize: 12, color: '#70737E', fontWeight: 500 }}>Pick up where you left off.</div>
          </div>
          <div className={styles.continueBox}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#5B5E69', textTransform: 'uppercase' }}>Continue learning</div>
              <p className={styles.continueTitle}>Data analysis</p>
              <div className={styles.continueMeta}>Cleaning messy data · Lesson 3 · Fixing dates and text</div>
              <div className={styles.progressTrack}><div className={styles.progressFill} style={{ width: '65%' }} /></div>
              <div style={{ fontSize: 11, color: '#5B5E69', marginTop: 4, fontWeight: 600 }}>65% complete</div>
            </div>
            <span className={styles.miniBtn}>Resume lesson</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#14151A' }}>My courses</div>
          <div className={styles.courseGrid}>
            <MiniCourse tone="lavender" icon={<Layers size={18} strokeWidth={1.75} />} title="Data analysis" meta="65% complete" pct={65} />
            <MiniCourse tone="sky" icon={<BarChart3 size={18} strokeWidth={1.75} />} title="Spreadsheet basics" meta="Completed" pct={100} />
            <MiniCourse tone="lime" icon={<BookOpen size={18} strokeWidth={1.75} />} title="Data visualization" meta="Not started" pct={0} />
          </div>
        </div>
        <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#14151A' }}>Live sessions</div>
          <div className={styles.sessionList}>
            <div className={styles.sessionItem} style={{ background: '#DCE7F9', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Video size={16} strokeWidth={1.75} />
              <div><strong>Data analysis: Q&amp;A</strong><span>Today · 10:00 – 11:00</span></div>
            </div>
            <div className={styles.sessionItem} style={{ background: '#EEF3D8', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={16} strokeWidth={1.75} />
              <div><strong>Data visualization workshop</strong><span>Thu 22 Oct · 2:00 – 3:00 PM</span></div>
            </div>
          </div>
          <div className={styles.certificate}>
            <Award size={22} strokeWidth={1.75} color="#3B40B8" style={{ margin: '0 auto' }} />
            <small>Certificate of completion</small>
            <strong>Spreadsheet basics</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniCourse({ tone, icon, title, meta, pct }: { tone: 'lavender' | 'sky' | 'lime'; icon: React.ReactNode; title: string; meta: string; pct: number }) {
  const bg = tone === 'lavender' ? '#E8E8FA' : tone === 'sky' ? '#DCE7F9' : '#EEF3D8';
  return (
    <div className={styles.courseMini}>
      <div className={styles.courseMiniArt} style={{ background: bg }}>{icon}</div>
      <div className={styles.courseMiniBody}>
        <p className={styles.courseMiniTitle}>{title}</p>
        <div className={styles.courseMiniMeta}>{meta}</div>
        <div className={styles.progressTrack}><div className={styles.progressFill} style={{ width: `${pct}%` }} /></div>
      </div>
    </div>
  );
}

