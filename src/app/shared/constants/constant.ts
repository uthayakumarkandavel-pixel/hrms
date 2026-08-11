export const CONSTANTS = {
  SIDEBAR: {
    USER: [
      { title: 'Home', icon: 'home', link: '/team-member/home' },
      { title: 'Attendance', icon: 'schedule', link: '/team-member/attendance' },
      { title: 'Holiday', icon: 'beach_access', link: '/team-member/holiday' },
      { title: 'Leave Management', icon: 'event_note', link: '/team-member/leave-management' },
      { title: 'Recognitions', icon: 'stars', link: '/team-member/recognitions' },
    ],
    ADMIN: [
      { title: 'Home', icon: 'home', link: '/team-leader/home' },
      { title: 'Leave Management', icon: 'event_note', link: '/team-leader/leave-management' },
    ],
  },
  BADGES: {
    badges: [
      {
        name: 'Consistent Contributor',
        duration: '1 Month',
        description: 'No unplanned absence',
        icon: 'workspace_premium',
        status: 'Earned',
        progress: 100,
        current: 1,
        target: 1,
      },
      {
        name: 'Attendance Champion',
        duration: '3 Months',
        description: 'No unplanned absence',
        icon: 'military_tech',
        status: 'Earned',
        progress: 100,
        current: 3,
        target: 3,
      },
      {
        name: 'Reliability Star',
        duration: '6 Months',
        description: 'No unplanned absence',
        icon: 'star',
        status: 'In Progress',
        progress: 50,
        current: 3,
        target: 6,
      },
      {
        name: 'Attendance Excellence',
        duration: '12 Months',
        description: 'No unplanned absence',
        icon: 'emoji_events',
        status: 'Locked',
        progress: 25,
        current: 3,
        target: 12,
      },
    ],

    history: [
      {
        name: 'Attendance Champion',
        description: 'No unplanned absence for 3 consecutive months',
        date: '11 Aug 2026',
        icon: 'military_tech',
      },
      {
        name: 'Consistent Contributor',
        description: 'No unplanned absence for 1 month',
        date: '01 Jun 2026',
        icon: 'workspace_premium',
      },
      {
        name: 'Consistent Contributor',
        description: 'No unplanned absence for 1 month',
        date: '01 May 2026',
        icon: 'workspace_premium',
      },
    ],
  },
  HOLIDAYS: {
    2026: [
      {
        date: '2026-01-01',
        name: 'New Year',
      },
      {
        date: '2026-01-15',
        name: 'Pongal',
      },
      {
        date: '2026-01-26',
        name: 'Republic Day',
      },
      {
        date: '2026-04-14',
        name: 'Tamil New Year',
      },
      {
        date: '2026-04-23',
        name: 'Tamilnadu Election Day',
      },
      {
        date: '2026-05-01',
        name: 'Labour Day',
      },
      {
        date: '2026-08-15',
        name: 'Independence Day',
      },
      {
        date: '2026-10-02',
        name: 'Gandhi Jayanti',
      },
      {
        date: '2026-10-22',
        name: 'Vijayadasami',
      },
      {
        date: '2026-11-10',
        name: 'Deepavali',
      },
      {
        date: '2026-12-25',
        name: 'Christmas',
      },
    ],
  },
  LEAVE_MANAGEMENT: {
    TITLE: 'Leave Management',
    CAPTION: 'Manage your leave and permission requests.',
    LEAVE_LIMITS: {
      annualLeaveDays: 10,
      monthlyPermissionHours: 3,
      casualLeaveAdvanceMonths: 1,
    },
    LEAVE_PROGRESS: {TITLE:'Annual Leave',CAPTION:'2026'},
    PERMISSION_PROGRESS: {TITLE:'Monthly Permissions',CAPTION:'2026'},

  },
};
