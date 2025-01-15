import { BellIcon, CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RealTimeClock from './DateTime';


interface HeaderProps {
  date: string;
  teamMembers: { id: string; avatar: string }[];
}

export function Header({ date, teamMembers }: HeaderProps) {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex-1 max-w-xl">
        <input
          type="text"
          placeholder="Search your task here..."
          className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7B7B]"
        />
      </div>
      <div className="flex items-center space-x-6">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <BellIcon className="w-6 h-6 text-gray-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <CalendarIcon className="w-6 h-6 text-gray-500" />
        </button>
        <div className="flex items-center -space-x-2">
          {teamMembers.map((member) => (
            <img
              key={member.id}
              src={member.avatar}
              alt="Team member"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
          <Button variant="outline" className="ml-4 text-[#FF7B7B] border-[#FF7B7B]">
            + Invite
          </Button>
        </div>
        <div className="text-right">
        <RealTimeClock />
        </div>
      </div>
    </div>
  )
}

