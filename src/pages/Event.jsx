'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { CalendarIcon, Users, Video, MessageCircle } from 'lucide-react'
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateEventPage() {
  const [date, setDate] = useState<Date>()

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-12 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        <motion.header className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-bold text-white mb-4">Create Your Event</h1>
          <p className="text-xl text-gray-200">Bring people together and share your knowledge</p>
        </motion.header>

        <div className="grid grid-cols-3 gap-8">
          <motion.div
            className="col-span-2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-xl"
            variants={itemVariants}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventName" className="block text-sm font-medium text-gray-200 mb-2">Event Name</label>
                  <Input id="eventName" placeholder="Enter event name" className="w-full bg-white bg-opacity-20 border-none text-white placeholder-gray-400" />
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-200 mb-2">Event Type</label>
                  <Select>
                    <SelectTrigger className="w-full bg-white bg-opacity-20 border-none text-white">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="group">Group Meeting</SelectItem>
                      <SelectItem value="oneOnOne">One-on-One Session</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-200 mb-2">Event Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white bg-opacity-20 border-none text-white",
                          !date && "text-gray-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-200 mb-2">Max Participants</label>
                  <Input id="maxParticipants" type="number" placeholder="Enter max participants" className="w-full bg-white bg-opacity-20 border-none text-white placeholder-gray-400" />
                </div>
              </div>
              <div>
                <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-200 mb-2">Event Description</label>
                <Textarea id="eventDescription" placeholder="Describe your event" className="w-full bg-white bg-opacity-20 border-none text-white placeholder-gray-400 h-32" />
              </div>
              <div>
                <label htmlFor="eventTags" className="block text-sm font-medium text-gray-200 mb-2">Event Tags</label>
                <Input id="eventTags" placeholder="Enter tags separated by commas" className="w-full bg-white bg-opacity-20 border-none text-white placeholder-gray-400" />
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-gray-900 hover:from-yellow-500 hover:to-pink-600 text-lg py-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Event
              </Button>
            </form>
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-4">Event Tips</h2>
              <ul className="space-y-2 text-gray-200">
                <li className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-yellow-400" />
                  Define your target audience
                </li>
                <li className="flex items-center">
                  <Video className="w-5 h-5 mr-2 text-green-400" />
                  Test your audio and video setup
                </li>
                <li className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
                  Encourage participant interaction
                </li>
                <li className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-pink-400" />
                  Send reminders before the event
                </li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-4">Need Help?</h2>
              <p className="text-gray-200 mb-4">Our support team is here to assist you in creating the perfect event.</p>
              <Button 
                className="w-full bg-white text-gray-900 hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}