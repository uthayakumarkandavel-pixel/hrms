export const CONSTANTS = {
  APP: {
    NAME: 'HRMS',
    TAGLINE: 'People workspace',
    DESCRIPTION: 'Human Resource Management System',
    VERSION: 'v1.0',
    COPYRIGHT: '© 2026 HRMS',
  },

  AUTH: {
    LOGIN_AS_USER: 'Login as User',
    LOGIN_AS_ADMIN: 'Login as Admin',
  },

  HEADER: {
    SEARCH: 'Search',
    NOTIFICATIONS: 'Notifications',
    MY_ACCOUNT: 'My Account',
    ACCOUNT_SETTINGS: 'Account settings',
    PROFILE: 'Profile',
    SETTINGS: 'Settings',
    LOGOUT: 'Logout',
  },


  NOT_FOUND: {
    EYEBROW: 'ERROR 404',
    TITLE: 'Page not found',
    DESCRIPTION:
      "The page you're looking for doesn't exist, may have moved, or is not available for your current workspace.",
    BACK_TO_LOGIN: 'Back to login',
  },

  HOLIDAY: {
    TITLE: 'Company Holidays',
    CAPTION: 'Official holidays and important dates for 2026.',
    CALENDAR_TITLE: 'Holiday Calendar',
    CALENDAR_CAPTION: 'Company holidays for the current year',
    HOLIDAYS_SUFFIX: 'Holidays',
  },

  LEAVE: {
    NEW_REQUEST: 'New Request',
    REQUEST_LEAVE: 'Request Leave',
    REQUEST_LEAVE_DESCRIPTION: 'Sick or casual leave',
    REQUEST_PERMISSION: 'Request Permission',
    REQUEST_PERMISSION_DESCRIPTION: 'Maximum 3 hours per month',
  },

  LEAVE_DIALOG: {
    TITLE: 'Request Leave',
    CAPTION: 'Submit a leave request for approval.',
    NO_BALANCE_TITLE: 'No Leave Balance',
    NO_BALANCE_DESCRIPTION: 'You have used all {days} leave days available for this year.',
    CLOSE: 'Close',
    REMAINING_THIS_YEAR: 'remaining this year',
    LEAVE_TYPE: 'Leave Type',
    SICK_LEAVE: 'Sick Leave',
    CASUAL_LEAVE: 'Casual Leave',
    FROM: 'From',
    TO: 'To',
    START_DATE_REQUIRED: 'Start date is required.',
    END_DATE_REQUIRED: 'End date is required.',
    CASUAL_LEAVE_ADVANCE: 'Casual leave requires one month advance notice.',
    PAST_DATE: 'Leave cannot be requested for a past date.',
    END_DATE_AFTER_START: 'End date must be after start date.',
    MAX_DAYS: 'You can select a maximum of {days} day{s}.',
    CASUAL_LEAVE_INFO_TITLE: 'Casual Leave',
    CASUAL_LEAVE_INFO:
      'Dates within the next month are disabled. You can apply from {date} onward.',
    SELECT_UP_TO: 'You can select up to',
    CONSECUTIVE_DAYS: 'consecutive day{s} from your selected start date.',
    REASON: 'Reason',
    REASON_PLACEHOLDER: 'Enter the reason for your leave',
    REASON_REQUIRED: 'Reason is required.',
    MIN_5_CHARS: 'Minimum 5 characters required.',
    MAX_250_CHARS: 'Maximum 250 characters allowed.',
    CANCEL: 'Cancel',
    SUBMIT_REQUEST: 'Submit Request',
  },

  PERMISSION_DIALOG: {
    TITLE: 'Request Permission',
    CAPTION: 'Request permission for a short absence.',
    NO_BALANCE_TITLE: 'No Permission Balance',
    NO_BALANCE_DESCRIPTION: 'You have used all 3 permission hours available for this month.',
    CLOSE: 'Close',
    REMAINING_THIS_MONTH: 'remaining this month',
    DATE: 'Permission Date',
    DATE_REQUIRED: 'Permission date is required.',
    PAST_DATE: 'Permission cannot be requested for a past date.',
    DURATION: 'Duration',
    HOUR: 'hour',
    HOURS: 'hours',
    MAX_REMAINING: 'Maximum remaining:',
    DURATION_REQUIRED: 'Duration is required.',
    MIN_PERMISSION: 'Minimum permission is 30 minutes.',
    MAX_PERMISSION: 'Maximum permission is 3 hours.',
    BALANCE_EXCEEDED: 'You only have {hours} hours remaining this month.',
    MONTHLY_LIMIT: 'Monthly permission limit:',
    REASON: 'Reason',
    REASON_PLACEHOLDER: 'Enter the reason for your permission',
    REASON_REQUIRED: 'Reason is required.',
    MIN_5_CHARS: 'Minimum 5 characters required.',
    MAX_250_CHARS: 'Maximum 250 characters allowed.',
    CANCEL: 'Cancel',
    SUBMIT_REQUEST: 'Submit Request',
  },

  REQUEST_TYPE_DIALOG: {
    TITLE: 'New Request',
    CAPTION: 'Choose the type of request.',
    CLOSE: 'Close',
    REQUEST_LEAVE: 'Request Leave',
    REQUEST_LEAVE_DESCRIPTION: 'Apply for sick or casual leave',
    REQUEST_PERMISSION: 'Request Permission',
    REQUEST_PERMISSION_DESCRIPTION: 'Up to 3 hours per month',
  },

  PROGRESS_CARD: {
    USED: 'used',
    REMAINING: 'remaining',
  },

  RECOGNITIONS: {
    BADGES: 'Badges',
    YOUR_BADGES: 'Your Badges',
  },

  PAGE_HEADERS: {
    ADMIN_HOME: {
      TITLE: 'Home',
      CAPTION: 'Overview of your HR workspace.',
    },
    ADMIN_LEAVE_MANAGEMENT: {
      TITLE: 'Leave Management',
      CAPTION: 'Manage team leave requests.',
    },
    USER_HOME: {
      TITLE: 'Home',
      CAPTION: 'Your HR workspace overview.',
    },
    ATTENDANCE: {
      TITLE: 'Attendance',
      CAPTION: 'View your attendance information.',
    },
    HOLIDAY: {
      TITLE: 'Company Holidays',
      CAPTION: 'Official holidays and important dates for 2026.',
    },
    LEAVE_MANAGEMENT: {
      TITLE: 'Leave Management',
      CAPTION: 'Manage your leave and permission requests.',
    },
    RECOGNITIONS: {
      TITLE: 'Recognitions',
      CAPTION: 'View your attendance badges and achievements.',
    },
  },

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
    BADGES_TITLE: 'Recognition Badges',
    BADGES_DESCRIPTION: 'Build a culture of appreciation by celebrating meaningful contributions.',
    EARNED: 'earned',
    BADGES_EARNED: 'badges earned',
    AWARDED_BY: 'Awarded by',
    NO_BADGES: 'You have not received any badges yet.',
  },

  LEAVE_MANAGEMENT: {
    TITLE: 'Leave Management',
    CAPTION: 'Manage your leave and permission requests.',
    LEAVE_LIMITS: {
      annualLeaveDays: 10,
      monthlyPermissionHours: 3,
      casualLeaveAdvanceMonths: 1,
    },
    LEAVE_PROGRESS: { TITLE: 'Leaves', CAPTION: '2026' },
    PERMISSION_PROGRESS: { TITLE: 'Permissions', CAPTION: '2026' },
  },
};
