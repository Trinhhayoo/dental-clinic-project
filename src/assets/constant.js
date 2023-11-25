import { HiOutlineHome } from 'react-icons/hi';

import { CiCalendar } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { MdOutlinePayments } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";


export const links = [
  { name: 'Overview', to: '/', icon: HiOutlineHome },
  { name: 'Patient', to: '/favourite-song', icon: IoMdPerson },

  { name: 'Appointment', to: '/top-charts', icon: CiCalendar },
  { name: 'Request', to: '/upload-song', icon: VscGitPullRequestGoToChanges },
  { name: 'Payment', to: '/create-playlist', icon: MdOutlinePayments },
  { name: 'Schedule', to: '/playlist', icon: IoCalendarOutline }
];
export const reports = [
  { name: 'Appointments', value: '24,4k', to: '/', icon: CiCalendar, color: 'red' },
  { name: 'Patients', value: '166,3k', to: '/favourite-song', icon: IoMdPerson, color: 'purple' },
  { name: 'Requests', value: '53,3k', to: '/top-charts', icon: VscGitPullRequestGoToChanges, color: 'red' },
  { name: 'Treatment Plan', value: '53,3k', to: '/top-charts', icon: VscGitPullRequestGoToChanges, color: 'red' }

]
