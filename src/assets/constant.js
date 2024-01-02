import { HiOutlineHome } from 'react-icons/hi';

import { CiCalendar } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { MdOutlinePayments } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { FaHospitalUser } from "react-icons/fa";
import { CiStethoscope } from "react-icons/ci";

export const links = [
  { name: 'Overview', to: '/home', icon: HiOutlineHome },
  { name: 'Patient List', to: '/Patient', icon: IoMdPerson },
  { name: 'Your Profile', to: '/Patient/:PatientId', icon: IoMdPerson },
  {name: 'Employee List', to: '/Employee', icon:FaHospitalUser },
  { name: 'Appointment List', to: '/Appointment', icon: CiCalendar },
  { name: 'Request List', to: '/Request', icon: VscGitPullRequestGoToChanges },
  { name: 'TreatmentPlan List', to: '/TreatmentPlan', icon: CiStethoscope },
  { name: 'Payment List', to: '/Payment', icon: MdOutlinePayments },
  { name: 'Schedule', to: '/Schedule', icon: IoCalendarOutline },
  { name: 'Retreatment List', to: '/Retreatment', icon: IoCalendarOutline },
  { name: 'Medicine List', to: '/MedicineList', icon: IoCalendarOutline }
];
export const reports = [
  { name: 'Appointments', value: '24,4k', to: '/', icon: CiCalendar, color: 'red' },
  { name: 'Patients', value: '166,3k', to: '/Patient', icon: IoMdPerson, color: 'purple' },
  { name: 'Requests', value: '53,3k', to: '/Request', icon: VscGitPullRequestGoToChanges, color: 'red' },
  { name: 'Treatment Plan', value: '53,3k', to: '/Treatment-Plan', icon: VscGitPullRequestGoToChanges, color: 'red' }

]
